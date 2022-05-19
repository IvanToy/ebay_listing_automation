const getGeneralSpecs = async (page) => {
  try {
    const generalSpecs = await page.evaluate(() => {
      const specs = {};
      const listOfSpecs = ["Brand", "Style", "Frame Color"];
      const pattern = /((?<=\[)\w+(?=\])|optItemSpec|(?<=\[)\w+\s\w+(?=\]))/;
      const specsDiv = document.getElementById("v4-8itmSpcCnt").children;
      const arrayOfChildren = [...specsDiv];

      arrayOfChildren.forEach((child) => {
        if (pattern.test(child.id)) getTitleAndId(child);
      });

      function getTitleAndId(item) {
        let children = item.children;
        for (let i = 0; i < children.length; i++) {
          if (
            item.id !== "optItemSpec" &&
            children[i].tagName === "DIV" &&
            children[i].className === ""
          ) {
            let div = children[i].children;
            let [inputTitle, inputId] = div;
            let [title] = inputTitle.id.match(/(?<=\[).*(?=\])/g);
            let [id] = inputId.children[1].id.match(/.*(?=\_)/g);
            const generalPart = id.split(/\W/g).slice(0, 3).join("\\.");
            const uniquePart = id.split(/\W/g).slice(3).length
              ? id.split(/\W/g).slice(3).join("\\ ").trim()
              : id.split(/\W/g).slice(3).join("\\");
            if (listOfSpecs.includes(title))
              specs[title.toLowerCase()] = `#${generalPart}\\[${uniquePart}]`;
          }
        }
      }
      return specs;
    });
    return generalSpecs;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getGeneralSpecs;