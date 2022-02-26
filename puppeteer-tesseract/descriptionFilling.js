const descriptionVintage = require("./description/descriptionVintage.js");
const descriptionModern = require("./description/descriptionModern.js");

const descriptionFilling = async (
  category,
  spec,
  frameDescription,
  descriptionBody,
  page,
  j
) => {
  try {
    if (category === "vintage") {
      await descriptionVintage(
        category,
        spec,
        frameDescription,
        descriptionBody,
        page,
        j
      );
    } else {
      await descriptionModern(
        category,
        spec,
        frameDescription,
        descriptionBody,
        page,
        j
      );
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = descriptionFilling;
