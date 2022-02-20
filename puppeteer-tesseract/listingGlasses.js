const fs = require("fs");
const puppeteer = require("puppeteer");
const chrome = require("chrome-cookies-secure");
const getTextFromImage = require("./tesseract.js");
const { selectorsObject, urlAndIdsObject } = require("./selectors-urls");
//todo
//1)finish description done
//2) flag to terminate OCR done
//3)on second iteration delete photos done
//4)create new listing ?
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
      args: ["--start-maximized"],
    });

    let pages = await browser.pages();
    const page = pages[0];
    await page.setCookie(...cookies);

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const photos = await fsPromises.readdir(path);

    let j = 1;

    for (let i = 0; i < photos.length; i += 6) {
      let descriptions;
      descriptions = await getTextFromImage(`${path}/${photos[i]}`);

      if (i + 6 + 1 > photos.length) {
        descriptions = await getTextFromImage(`${path}/${photos[i]}`, true);
      }

      const descriptionBody = `${category && "Vintage"}  ${
        descriptions.brand
      } ${descriptions.model}  ${descriptions.color} ${descriptions.style} ${
        category === "original" ? "frames" : "FRAMES ONLY"
      } ${descriptions.made}`;

      const photosSelected = photos
        .slice(i + 1, i + 5 + 1)
        .map((photo) => `${path}/${photo}`);

      console.log(photosSelected);

      const iFramePhoto = await page.$(selectorsObject.photos);
      const framePhoto = await iFramePhoto.contentFrame();

      if (j > 1) {
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

      await page.click(selectorsObject.title, { clickCount: 3 });

      await page.type(selectorsObject.title, descriptionBody, { delay: 100 });

      await page.click(selectorsObject.label, { clickCount: 2 });

      await page.type(selectorsObject.label, descriptions.label, {
        delay: 100,
      });

      await page.click(selectorsObject.brand, { clickCount: 2 });

      await page.type(selectorsObject.brand, descriptions.brand, {
        delay: 100,
      });

      await page.click(selectorsObject.style, { clickCount: 2 });

      await page.type(selectorsObject.style, descriptions.style, {
        delay: 100,
      });

      await page.click(selectorsObject.color, { clickCount: 2 });

      await page.type(selectorsObject.color, descriptions.color, {
        delay: 100,
      });

      await page.click(selectorsObject.material, { clickCount: 2 });

      await page.type(selectorsObject.material, descriptions.material, {
        delay: 100,
      });

      await page.click(selectorsObject.made, { clickCount: 2 });

      await page.type(selectorsObject.made, descriptions.made, { delay: 100 });

      await page.click(selectorsObject.temple, { clickCount: 2 });

      await page.type(selectorsObject.temple, descriptions.temple, {
        delay: 100,
      });

      await page.click(width, { clickCount: 2 });

      await page.type(width, descriptions.width, { delay: 100 });

      await page.click(height, { clickCount: 2 });

      await page.type(height, descriptions.height, { delay: 100 });

      await page.click(bridge, { clickCount: 2 });

      await page.type(bridge, descriptions.bridge, { delay: 100 });

      const iFrameDescription = await page.$(frameDes);
      const frameDescription = await iFrameDescription.contentFrame();

      if (category === "vintage" && spec === "prescription") {
        if (j === 1) {
          let [elHandle] = await frameDescription.$x("/html/body/text()");
          await elHandle.evaluate((el) => {
            el.remove();
          }, elHandle);
        }
        await frameDescription.click(selectorsObject.modernDescription, {
          clickCount: 3,
        });
        await frameDescription.type(
          selectorsObject.modernDescription,
          `${descriptionBody}\n`,
          { delay: 100 }
        );
      } else if (category === "vintage" && spec === "original") {
        await frameDescription.click(
          selectorsObject.vintageOriginalDescription,
          { clickCount: 3 }
        );
        await frameDescription.type(
          selectorsObject.vintageOriginalDescription,
          descriptionBody,
          { delay: 100 }
        );
      } else if (category === "vintage" && spec === "frames") {
        await frameDescription.click(selectorsObject.vintageFramesDescription, {
          clickCount: 3,
        });
        await frameDescription.type(
          selectorsObject.vintageFramesDescription,
          descriptionBody,
          { delay: 100 }
        );
      }

      if (category === "modern" && spec === "prescription") {
        let [elHandle] = await frameDescription.$x("/html/body/text()");
        await elHandle.evaluate((el) => {
          el.remove();
        }, elHandle);

        await frameDescription.click(selectorsObject.modernDescription, {
          clickCount: 3,
        });
        await frameDescription.type(
          selectorsObject.modernDescription,
          `${descriptionBody}\n`,
          { delay: 100 }
        );
      } else if (category === "modern" && spec === "original") {
        await frameDescription.click(selectorsObject.modernDescription, {
          clickCount: 3,
        });
        await frameDescription.type(
          selectorsObject.modernDescription,
          descriptionBody,
          { delay: 100 }
        );
      } else if (category === "modern" && spec === "frames") {
        await frameDescription.click(selectorsObject.modernDescription, {
          clickCount: 3,
        });
        await frameDescription.type(
          selectorsObject.modernDescription,
          descriptionBody,
          { delay: 100 }
        );
      }

      await page.click(selectorsObject.price, { clickCount: 2 });

      await page.type(selectorsObject.price, descriptions.price, {
        delay: 100,
      });

      await page.click("#actionbar > input.pbtn");

      if (j >= 1) {
        await page.waitForSelector("#confirm_button_wrap > form > input.pbtn", {
          visible: true,
        });
        const [response] = await Promise.all([
          page.waitForNavigation(),
          await page.click("#confirm_button_wrap > form > input.pbtn"),
        ]);
        console.log(response);
      } else {
        await page.waitForSelector(
          "#confirm_layer_wrap > div:nth-child(4) > div.cfm-cnt > div:nth-child(5) > div:nth-child(2) > span > form:nth-child(1) > a",
          { visible: true }
        );
        const [response] = await Promise.all([
          page.waitForNavigation(),
          await page.click(
            "#confirm_layer_wrap > div:nth-child(4) > div.cfm-cnt > div:nth-child(5) > div:nth-child(2) > span > form:nth-child(1) > a"
          ),
        ]);
        console.log(response);
      }

      j++;
    }
  } catch (error) {
    console.error(error);
  }
};

listingGlasses(
  "https://bulksell.ebay.com/ws/eBayISAPI.dll?SingleList&&DraftURL=https://www.ebay.com/sh/lst/drafts&ReturnURL=https://www.ebay.com/sh/lst/active&sellingMode=AddItem&templateId=6000494011&returnUrl=https://bulksell.ebay.com/ws/eBayISAPI.dll?SingleList",
  1,
  "vintage",
  "prescription"
);

module.exports = listingGlasses;
