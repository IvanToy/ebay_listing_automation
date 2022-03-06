const descriptionVintage = require("./description/descriptionVintage.js");
const descriptionModern = require("./description/descriptionModern.js");

const descriptionFilling = async (args, j) => {
  try {
    if (category === "vintage") {
      await descriptionVintage(args, j);
    } else {
      await descriptionModern(args, j);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = descriptionFilling;
