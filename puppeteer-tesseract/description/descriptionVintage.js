const { selectorsObject } = require("../selectors-urls.js");

const descriptionVintage = async (args, j) => {
  const [category, spec, frameDescription, descriptionBody, page] = args;
  try {
    if (category === "vintage" && spec === "prescription") {
      if (j === 0) {
        let [elHandle] = await frameDescription.$x("/html/body/text()");
        await elHandle.evaluate((el) => {
          el.remove();
        }, elHandle);
      }
      await frameDescription.click(
        selectorsObject.vintage.descriptionPrescription,
        { clickCount: 3 }
      );

      await frameDescription.type(
        selectorsObject.vintage.descriptionPrescription,
        descriptionBody,
        { delay: 100 }
      );

      await page.keyboard.press("Enter");
    } else if (category === "vintage" && spec === "original") {
      await frameDescription.click(
        selectorsObject.vintage.descriptionOriginal,
        { clickCount: 3 }
      );
      await frameDescription.type(
        selectorsObject.vintage.descriptionOriginal,
        descriptionBody,
        { delay: 100 }
      );
      await page.keyboard.press("Enter");
    } else if (category === "vintage" && spec === "frames") {
      if (j >= 1) {
        await frameDescription.click(
          selectorsObject.vintage.descriptionFrames2,
          { clickCount: 3 }
        );
        await frameDescription.type(
          selectorsObject.vintage.descriptionFrames2,
          descriptionBody,
          { delay: 100 }
        );
        await page.keyboard.press("Enter");
      } else {
        await frameDescription.click(
          selectorsObject.vintage.descriptionFrames1,
          { clickCount: 3 }
        );
        await frameDescription.type(
          selectorsObject.vintage.descriptionFrames1,
          descriptionBody,
          { delay: 100 }
        );
        await page.keyboard.press("Enter");
      }
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = descriptionVintage;
