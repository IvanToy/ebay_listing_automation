const { selectorsObject } = require("./selectors-urls.js");

const detailsFilling = async (
  width,
  height,
  bridge,
  descriptions,
  descriptionBody,
  page,
  category
) => {
  try {
    await page.click(selectorsObject.title, { clickCount: 3 });

    await page.type(selectorsObject.title, descriptionBody, { delay: 100 });

    await page.click(selectorsObject.label, { clickCount: 2 });

    await page.type(selectorsObject.label, descriptions.label, {
      delay: 100,
    });

    await page.click(selectorsObject.brand, { clickCount: 3 });

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

    if (category === "modern") {
      await page.click("#v4-84 > a.eib-more");

      await page.click(selectorsObject.made, { clickCount: 2 });

      await page.type(selectorsObject.made, descriptions.made, { delay: 100 });
    } else {
      await page.click(selectorsObject.made, { clickCount: 2 });

      await page.type(selectorsObject.made, descriptions.made, { delay: 100 });
    }

    await page.click(selectorsObject.temple, { clickCount: 2 });

    await page.type(selectorsObject.temple, descriptions.temple, {
      delay: 100,
    });

    await page.focus(width);

    await page.click(width, { clickCount: 2 });

    await page.keyboard.type(descriptions.width, { delay: 100 });

    await page.focus(height);

    await page.click(height, { clickCount: 2 });

    await page.keyboard.type(descriptions.height, { delay: 100 });

    await page.focus(bridge);

    await page.click(bridge, { clickCount: 2 });

    await page.keyboard.type(descriptions.bridge, { delay: 100 });

    if (descriptions.price === "20.00") {
      await page.$$eval("#bestOffer", (checks) =>
        checks.forEach((c) => (c.checked = false))
      );
    }
    await page.focus(selectorsObject.price);

    await page.click(selectorsObject.price, { clickCount: 2 });

    await page.keyboard.type(descriptions.price, {
      delay: 100,
    });

    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = detailsFilling;
