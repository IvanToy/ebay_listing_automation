const descriptionVintage = require("./description/descriptionVintage.js");
const descriptionModern = require("./description/descriptionModern.js");

const descriptionFilling = async (args, j) => {
  const [category] = args;
  try {
    category === "vintage"
      ? await descriptionVintage(args, j)
      : await descriptionModern(args, j);
  } catch (error) {
    console.error(error);
  }
};

module.exports = descriptionFilling;
