const { selectorsObject } = require("./selectors-urls.js");

const detailsFilling = async (arguments) => {
  const [width, height, bridge, descriptions, descriptionBody, page, category] =
    arguments;
  try {
    await page.click(selectorsObject.title, { clickCount: 3 });

    await page.type(selectorsObject.title, descriptionBody, { delay: 100 });

    await page.click(selectorsObject.label, { clickCount: 2 });

    await page.type(selectorsObject.label, descriptions.label, {
      delay: 100,
    });

    await page.focus(selectorsObject.brand);

    await page.click(selectorsObject.brand, { clickCount: 3 });

    if (descriptions.brand === "") {
      await page.type(selectorsObject.brand, "", {
        delay: 100,
      });
    } else {
      await page.type(selectorsObject.brand, descriptions.brand, {
        delay: 100,
      });
    }

    await page.focus(selectorsObject.style);

    await page.click(selectorsObject.style, { clickCount: 2 });

    await page.type(selectorsObject.style, descriptions.style, {
      delay: 100,
    });

    await page.focus(selectorsObject.color);

    await page.click(selectorsObject.color, { clickCount: 2 });

    await page.type(selectorsObject.color, descriptions.color, {
      delay: 100,
    });

    await page.focus(selectorsObject.material);

    await page.click(selectorsObject.material, { clickCount: 2 });

    await page.type(selectorsObject.material, descriptions.material, {
      delay: 100,
    });

    if (category === "modern") {
      await page.click("#v4-84 > a.eib-more");

      await page.focus(selectorsObject.made);

      await page.click(selectorsObject.made, { clickCount: 2 });

      if (descriptions.made === "") {
        await page.type(selectorsObject.made, "", { delay: 100 });
      } else {
        await page.type(selectorsObject.made, descriptions.made, {
          delay: 100,
        });
      }
    } else {
      await page.focus(selectorsObject.made);

      await page.click(selectorsObject.made, { clickCount: 2 });

      if (descriptions.made === "") {
        await page.type(selectorsObject.made, "", { delay: 100 });
      } else {
        await page.type(selectorsObject.made, descriptions.made, {
          delay: 100,
        });
      }
    }

    await page.focus(selectorsObject.temple);

    await page.click(selectorsObject.temple, { clickCount: 2 });

    if (descriptions.temple === "") {
      await page.type(selectorsObject.temple, "", {
        delay: 100,
      });
    } else {
      await page.type(selectorsObject.temple, descriptions.temple, {
        delay: 100,
      });
    }

    await page.focus(width);

    await page.click(width, { clickCount: 2 });

    await page.keyboard.type(descriptions.width, { delay: 100 });

    await page.focus(height);

    await page.click(height, { clickCount: 2 });

    await page.keyboard.type(descriptions.height, { delay: 100 });

    await page.focus(bridge);

    await page.click(bridge, { clickCount: 2 });

    await page.keyboard.type(descriptions.bridge, { delay: 100 });

    if (descriptions.price === "20.00" || descriptions.price === "24.00") {
      await page.$eval("#bestOffer", (el) => (el.checked = false));
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
