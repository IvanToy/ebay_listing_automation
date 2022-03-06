const { selectorsObject } = require("../selectors-urls.js");

const descriptionModern = async (args, j) => {
  const [category, spec, frameDescription, descriptionBody, page] = args;
  try {
    if (category === "modern" && spec === "prescription") {
      if (j === 0) {
        let [elHandle] = await frameDescription.$x("/html/body/text()");
        await elHandle.evaluate((el) => {
          el.remove();
        }, elHandle);
      }
      await frameDescription.click(
        selectorsObject.vintage.descriptionPrescription,
        {
          clickCount: 3,
        }
      );
      await frameDescription.type(
        selectorsObject.vintage.descriptionPrescription,
        descriptionBody,
        { delay: 100 }
      );
      await page.keyboard.press("Enter");
    } else if (category === "modern" && spec === "original") {
      await frameDescription.click(selectorsObject.modern.descriptionOriginal, {
        clickCount: 3,
      });
      await frameDescription.type(
        selectorsObject.modern.descriptionOriginal,
        descriptionBody,
        { delay: 100 }
      );
      await page.keyboard.press("Enter");
    } else if (category === "modern" && spec === "frames") {
      await frameDescription.click(selectorsObject.modern.descriptionFrames, {
        clickCount: 3,
      });
      await frameDescription.type(
        selectorsObject.modern.descriptionFrames,
        descriptionBody,
        { delay: 100 }
      );
    }
    await page.keyboard.press("Enter");
  } catch (error) {
    console.error(error);
  }
};

module.exports = descriptionModern;
