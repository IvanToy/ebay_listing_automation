const { selectorsObject } = require("./selectors-urls.js");

const detailsFilling = async (arguments) => {
  const [specifications, descriptions, descriptionBody, page, category] =
    arguments;
  try {
    await page.click(selectorsObject.title, { clickCount: 3 });

    await page.type(selectorsObject.title, descriptionBody, { delay: 100 });

    await page.click(selectorsObject.label, { clickCount: 3 });

    await page.type(selectorsObject.label, descriptions.label, {
      delay: 100,
    });

    await page.click(specifications.general.brand, { clickCount: 3 });

    descriptions.brand === ""
      ? await page.type(specifications.general.brand, "Unbranded ", {
          delay: 100,
        })
      : await page.type(specifications.general.brand, descriptions.brand, {
          delay: 100,
        });

    await page.click(specifications.general.style, { clickCount: 3 });

    await page.type(specifications.general.style, descriptions.style, {
      delay: 100,
    });

    await page.click(specifications.general["frame color"], { clickCount: 3 });

    await page.type(specifications.general["frame color"], descriptions.color, {
      delay: 100,
    });

    await page.click(specifications.additional["frame material"], {
      clickCount: 3,
    });

    await page.type(
      specifications.additional["frame material"],
      descriptions.material,
      {
        delay: 100,
      }
    );

    if (category === "modern") {
      await page.click("#v4-84 > a.eib-more");

      await page.focus(
        specifications.additional["country/region of manufacture"]
      );

      await page.click(
        specifications.additional["country/region of manufacture"],
        { clickCount: 3 }
      );

      descriptions.made === ""
        ? await page.type(
            specifications.additional["country/region of manufacture"],
            " ",
            { delay: 100 }
          )
        : await page.type(
            specifications.additional["country/region of manufacture"],
            descriptions.made,
            {
              delay: 100,
            }
          );
    } else {
      await page.focus(
        specifications.additional["country/region of manufacture"]
      );

      await page.click(
        specifications.additional["country/region of manufacture"],
        { clickCount: 3 }
      );

      descriptions.made === ""
        ? await page.type(
            specifications.additional["country/region of manufacture"],
            " ",
            { delay: 100 }
          )
        : await page.type(
            specifications.additional["country/region of manufacture"],
            descriptions.made,
            {
              delay: 100,
            }
          );
    }

    await page.focus(specifications.additional["temple length"]);

    await page.click(specifications.additional["temple length"], {
      clickCount: 3,
    });

    descriptions.temple === ""
      ? await page.type(specifications.additional["temple length"], " ", {
          delay: 100,
        })
      : await page.type(
          specifications.additional["temple length"],
          descriptions.temple,
          {
            delay: 100,
          }
        );

    await page.focus(specifications.additional.width);

    await page.click(specifications.additional.width, { clickCount: 3 });

    descriptions.width === ""
      ? await page.type(specifications.additional.width, " ", { delay: 100 })
      : await page.type(specifications.additional.width, descriptions.width, {
          delay: 100,
        });

    await page.focus(specifications.additional.height);

    await page.click(specifications.additional.height, { clickCount: 3 });

    descriptions.height === ""
      ? await page.type(specifications.additional.height, " ", { delay: 100 })
      : await page.type(specifications.additional.height, descriptions.height, {
          delay: 100,
        });

    await page.focus(specifications.additional.bridge);

    await page.click(specifications.additional.bridge, { clickCount: 3 });

    descriptions.bridge === ""
      ? await page.type(specifications.additional.bridge, " ", { delay: 100 })
      : await page.type(specifications.additional.bridge, descriptions.bridge, {
          delay: 100,
        });

    if (descriptions.price === "20.00" || descriptions.price === "24.00") {
      await page.$eval("#bestOffer", (el) => (el.checked = false));
    }
    await page.focus(selectorsObject.price);

    await page.click(selectorsObject.price, { clickCount: 3 });

    await page.type(selectorsObject.price, descriptions.price, {
      delay: 100,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = detailsFilling;
