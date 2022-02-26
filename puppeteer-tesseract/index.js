const listingGlasses = require("./listingGlasses.js");
const { urlAndIdsObject } = require("./selectors-urls.js");

const main = (args) => {
  const [urlOption, binNumber] = args;
  const splittedUrl = urlOption.split("-");
  const [category, spec, gender] = splittedUrl;
  let id;

  if (splittedUrl.length === 2) {
    id = urlAndIdsObject[category][spec];
  } else {
    id = urlAndIdsObject[category][spec][gender];
  }

  let url = `https://bulksell.ebay.com/ws/eBayISAPI.dll?SingleList&&DraftURL=https://www.ebay.com/sh/lst/drafts&ReturnURL=https://www.ebay.com/sh/lst/active&sellingMode=AddItem&templateId=${id}&returnUrl=https://bulksell.ebay.com/ws/eBayISAPI.dll?SingleList`;

  listingGlasses(url, binNumber, category, spec);
};

module.exports = main;
