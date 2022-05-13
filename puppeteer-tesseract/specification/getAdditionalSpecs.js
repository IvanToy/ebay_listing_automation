const getAdditionalSpecs = async (page, category) => {
  try {
    const additionalSpecs = await page.evaluate((category) => {
      const specs = {};
      const listOfSpecs = [
        "Frame Material",
        "Country/Region of Manufacture",
        "Temple Length",
        "Lens Width",
        "eisi-padBtm eib-vis",
      ];
      const pattern = /((?<=\[)\w+(?=\])|optItemSpec|(?<=\[)\w+\s\w+(?=\]))/;
      const specsDiv = document.getElementById("v4-8itmSpcCnt").children;
      const arrayOfChildren = [...specsDiv];

      arrayOfChildren.forEach((child) => {
        if (pattern.test(child.id)) getTitleAndId(child);
      });

      function getTitleAndId(item) {
        let children = item.children;
        for (let i = 0; i < children.length; i++) {
          if (item.id === "optItemSpec" && children[i].hasAttribute("id")) {
            let [title] = children[i].id.match(/(?<=\[).*(?=\])/g);
            let [id] = children[i].id.match(/(?<=\_).*/g);
            if (listOfSpecs.includes(title))
              specs[title.toLowerCase()] = `#${id}`;
          } else if (
            item.id === "optItemSpec" &&
            !children[i].hasAttribute("id")
          ) {
            let title =
              category === "modern" &&
              children[i].className === "eisi-padBtm eib-vis"
                ? children[i].children[0].value.match(/\w+$/g)[0].toLowerCase()
                : category !== "modern"
                ? children[i].children[0].value.match(/\w+$/g)[0].toLowerCase()
                : null;
            let id = children[i].children[0].id;
            if (title === "width") specs[title.toLowerCase()] = `#${id}`;
            if (title === "height") specs[title.toLowerCase()] = `#${id}`;
            if (title === "bridge") specs[title.toLowerCase()] = `#${id}`;
          }
        }
      }
      return specs;
    }, category);

    return additionalSpecs;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getAdditionalSpecs;
