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
            const generalPart = id.split(/\W/g).slice(0, 3).join("\\.");
            const uniquePart = id.split(/\W/g).slice(3).length
              ? id.split(/\W/g).slice(3).join("\\ ").trim()
              : id.split(/\W/g).slice(3).join("\\");
            if (
              listOfSpecs.includes(title) &&
              title !== "Country/Region of Manufacture"
            )
              specs[title.toLowerCase()] = `#${generalPart}\\[${uniquePart}]`;
            if (
              listOfSpecs.includes(title) &&
              title === "Country/Region of Manufacture"
            ) {
              const part1 = title.split(/\s/g).slice(1).join("\\ ").trim();
              const part2 = title
                .split(/\s/g)
                .slice(0, 1)[0]
                .split("/")
                .join("/");
              specs[
                title.toLowerCase()
              ] = `#${generalPart}\\[${part2}\\ ${part1}\\]`;
            }
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
