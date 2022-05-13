const getGeneralSpecs = require("./getGeneralSpecs");
const getAdditionalSpecs = require("./getAdditionalSpecs");

const getSpecification = async (page, category) => {
  try {
    const specifications = {
      general: {},
      additional: {},
    };
    const generalSpecs = await getGeneralSpecs(page);
    const additionalSpecs = await getAdditionalSpecs(page, category);

    specifications.general = generalSpecs;
    specifications.additional = additionalSpecs;

    return specifications;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getSpecification;
