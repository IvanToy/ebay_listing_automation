const fs = require("fs");
const puppeteer = require("puppeteer");
const chrome = require("chrome-cookies-secure");
const getTextFromImage = require("./tesseract.js");
const detailsFilling = require("./detailsFilling.js");
const descriptionFilling = require("./descriptionFilling.js");
const { selectorsObject, urlAndIdsObject } = require("./selectors-urls");

const fsPromises = fs.promises;

const listingGlasses = async (url, binNumber, category, spec) => {
  try {
    const path = `./Path/Path ${binNumber}`;

    const width =
      category === "vintage"
        ? selectorsObject.vintage.width
        : selectorsObject.modern.width;
    const height =
      category === "vintage"
        ? selectorsObject.vintage.height
        : selectorsObject.modern.height;
    const bridge =
      category === "vintage"
        ? selectorsObject.vintage.bridge
        : selectorsObject.modern.height;

    const frameDes =
      category === "vintage"
        ? selectorsObject.frameDescriptionVintage
        : selectorsObject.frameDescriptionModern;

    const cookies = await chrome.getCookiesPromised(
      urlAndIdsObject.ebay,
      "puppeteer",
      "Default"
    );

    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      slowMo: 250,
      args: ["--start-maximized"],
    });

    let pages = await browser.pages();
    const page = pages[0];
    await page.setCookie(...cookies);

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const photos = await fsPromises.readdir(path);

    let j = 0;

    for (let i = 0; i < photos.length; i += 6) {
      let descriptions;
      descriptions = await getTextFromImage(`${path}/${photos[i]}`);

      if (i + 6 + 1 > photos.length) {
        descriptions = await getTextFromImage(`${path}/${photos[i]}`, true);
      }

      const descriptionBody = `${category == "vintage" ? "Vintage" : ""} 
     ${descriptions.brand !== "" ? descriptions.brand : ""} 
     ${descriptions.model !== "" ? descriptions.model : ""} 
      ${descriptions.color} 
      ${descriptions.style}
       ${spec === "original" ? "Sunglasses Frames " : "Sunglasses FRAMES ONLY"}
       ${descriptions.made !== "" ? descriptions.made : ""}`;

      const photosSelected = photos
        .slice(i + 1, i + 5 + 1)
        .map((photo) => `${path}/${photo}`);

      const iFramePhoto = await page.$(selectorsObject.photos);
      const framePhoto = await iFramePhoto.contentFrame();

      if (j >= 1) {
        await framePhoto.$eval(selectorsObject.deletePhotosButton, (el) =>
          el.click()
        );

        await framePhoto.$eval(selectorsObject.confirmDelete, (el) =>
          el.click()
        );
      }

      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        framePhoto.click(selectorsObject.upload),
      ]);

      await fileChooser.accept([...photosSelected]);

      const arguments = [
        width,
        height,
        bridge,
        descriptions,
        descriptionBody,
        page,
        category,
      ];

      await detailsFilling(arguments);

      const iFrameDescription = await page.$(frameDes);
      const frameDescription = await iFrameDescription.contentFrame();

      const args = [category, spec, frameDescription, descriptionBody, page];

      await descriptionFilling(args, j);

      await page.click(selectorsObject.submit);

      if (j >= 1) {
        await page.waitForSelector(selectorsObject.relist, { visible: true });

        const [response] = await Promise.all([
          page.waitForNavigation(),
          await page.click(selectorsObject.relist),
        ]);
        console.log(response);
      } else {
        await page.waitForSelector(selectorsObject.list, { visible: true });

        const [response] = await Promise.all([
          page.waitForNavigation(),
          await page.click(selectorsObject.list),
        ]);
        console.log(response);
      }

      j++;
    }
    browser.close();
  } catch (error) {
    console.error(error);
  }
};

module.exports = listingGlasses;
