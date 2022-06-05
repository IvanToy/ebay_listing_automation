const fs = require("fs");
const puppeteer = require("puppeteer");
const chrome = require("chrome-cookies-secure");
const getTextFromImage = require("./tesseract.js");
const detailsFilling = require("./detailsFilling.js");
const descriptionFilling = require("./description/descriptionFilling.js");
const measurement = require("./measurements.js");
const getIframe = require("./getIFrames.js");
const { selectorsObject, urlAndIdsObject } = require("./selectors-urls");

const fsPromises = fs.promises;

const listingGlasses = async (url, binNumber, category, spec) => {
  try {
    //const path = `./Path/Path ${binNumber}`;


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

    // const photos = await fsPromises.readdir(path);

    const frames = await getIframe(page, category);
    console.log(frames);
    let j = 0;

    for (let i = 0; i < photos.length; i += 6) {
      let descriptions;
      descriptions = await getTextFromImage(`${path}/${photos[i]}`);

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

      const iFramePhoto = await page.$(frames.photoFrame);
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


      const measurement = await measurements(page, category);

      const arguments = [
        measurement,

        descriptions,
        descriptionBody,
        page,
        category,
        frames,
      ];

      await detailsFilling(arguments);


      const iFrameDescription = await page.$(frames.descriptionFrame);

      const frameDescription = await iFrameDescription.contentFrame();

      const args = [category, spec, frameDescription, descriptionBody, page];

      await descriptionFilling(args, j);

      await page.click(selectorsObject.submit);

      if (j >= 1) {
        await page.waitForSelector(selectorsObject.relist, { visible: true });

        await Promise.all([
          page.waitForNavigation(),
          await page.click(selectorsObject.relist),
        ]);
      } else {
        await page.waitForSelector(selectorsObject.list, { visible: true });

        await Promise.all([
          page.waitForNavigation(),
          await page.click(selectorsObject.list),
        ]);
      }

      j++;
    }
    browser.close();
  } catch (error) {
    console.error(error);
  }
};

module.exports = listingGlasses;
