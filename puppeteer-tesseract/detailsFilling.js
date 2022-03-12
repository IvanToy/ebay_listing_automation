const { selectorsObject } = require("./selectors-urls.js");

const detailsFilling = async (arguments) => {
  const [measurements, descriptions, descriptionBody, page, category] =
    arguments;
  try {
    await page.click(selectorsObject.title, { clickCount: 3 });

    await page.type(selectorsObject.title, descriptionBody, { delay: 100 });

    await page.click(selectorsObject.label, { clickCount: 3 });

    await page.type(selectorsObject.label, descriptions.label, {
      delay: 100,
    });

    await page.focus(selectorsObject.brand);

    await page.click(selectorsObject.brand, { clickCount: 3 });

    if (descriptions.brand === "") {
      await page.type(selectorsObject.brand, "Unbranded ", {
        delay: 100,
      });
    } else {
      await page.type(selectorsObject.brand, descriptions.brand, {
        delay: 100,
      });
    }

    await page.focus(selectorsObject.style);

    await page.click(selectorsObject.style, { clickCount: 3 });

    await page.type(selectorsObject.style, descriptions.style, {
      delay: 100,
    });

    await page.focus(selectorsObject.color);

    await page.click(selectorsObject.color, { clickCount: 3 });

    await page.type(selectorsObject.color, descriptions.color, {
      delay: 100,
    });

    await page.focus(selectorsObject.material);

    await page.click(selectorsObject.material, { clickCount: 3 });

    await page.type(selectorsObject.material, descriptions.material, {
      delay: 100,
    });

    if (category === "modern") {
      await page.click("#v4-84 > a.eib-more");

      await page.focus(selectorsObject.made);

      await page.click(selectorsObject.made, { clickCount: 3 });

      if (descriptions.made === "") {
        await page.type(selectorsObject.made, " ", { delay: 100 });
      } else {
        await page.type(selectorsObject.made, descriptions.made, {
          delay: 100,
        });
      }
    } else {
      await page.focus(selectorsObject.made);

      await page.click(selectorsObject.made, { clickCount: 3 });

      if (descriptions.made === " ") {
        await page.type(selectorsObject.made, " ", { delay: 100 });
      } else {
        await page.type(selectorsObject.made, descriptions.made, {
          delay: 100,
        });
      }
    }

    await page.focus(selectorsObject.temple);

    await page.click(selectorsObject.temple, { clickCount: 3 });

    if (descriptions.temple === "") {
      await page.type(selectorsObject.temple, " ", {
        delay: 100,
      });
    } else {
      await page.type(selectorsObject.temple, descriptions.temple, {
        delay: 100,
      });
    }

    await page.focus(measurements.width);

    await page.click(measurements.width, { clickCount: 3 });

    if (descriptions.width === "") {
      await page.type(measurements.width, " ", { delay: 100 });
    } else {
      await page.type(measurements.width, descriptions.width, { delay: 100 });
    }

    await page.focus(measurements.height);

    await page.click(measurements.height, { clickCount: 3 });

    if (descriptions.height === "") {
      await page.type(measurements.height, " ", { delay: 100 });
    } else {
      await page.type(measurements.height, descriptions.height, { delay: 100 });
    }

    await page.focus(measurements.bridge);

    await page.click(measurements.bridge, { clickCount: 3 });

    if (descriptions.bridge === "") {
      await page.type(measurements.bridge, " ", { delay: 100 });
    } else {
      await page.type(measurements.bridge, descriptions.bridge, { delay: 100 });
    }

    if (descriptions.price === "20.00" || descriptions.price === "24.00") {
      await page.$eval("#bestOffer", (el) => (el.checked = false));
    }
    await page.focus(selectorsObject.price);

    await page.click(selectorsObject.price, { clickCount: 3 });

    await page.keyboard.type(descriptions.price, {
      delay: 100,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = detailsFilling;
