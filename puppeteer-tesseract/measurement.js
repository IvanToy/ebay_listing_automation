const measurement = async (page) => {
  try {
    let measurements = await page.evaluate(() => {
      const m = {};
      let a = document.querySelector("#optItemSpec").children;

      for (let i = 0; i < a.length; i++) {
        if (a[i].className === "eisi-padBtm eib-vis") {
          if (a[i].children[0].tagName.toLowerCase() === "input") {
            let title = a[i].children[0].value.match(/\w+$/g)[0].toLowerCase();
            let id = `#${a[i].children[0].name}Val`;
            if (title === "width") m[title] = id;
            if (title === "height") m[title] = id;
            if (title === "bridge") m[title] = id;
          }
        }
      }
      return m;
    });
    return measurements;
  } catch (error) {
    console.error(error);
  }
};

module.exports = measurement;
