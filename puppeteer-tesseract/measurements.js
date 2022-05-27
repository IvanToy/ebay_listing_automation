const measurements = async (page, category) => {
  try {
    let measurement = await page.evaluate((category) => {
      const measurements = {};
      let i = category === "vintage" ? 1 : 2;
      let j = category === "vintage" ? 3 : 5;
      while (i <= j) {
        let titleElement = document.querySelector(
          `#optItemSpec > div:nth-child(1${i}) > div`
        ).children[0].textContent;
        let title = titleElement.split(/\s/g)[1].toLowerCase();
        let id = document.querySelector(
          `#optItemSpec > div:nth-child(1${i}) > div`
        ).children[2].children[0].children[0].id;
        measurements[title] = `#${id}`;

        if (category !== "vintage" && i == 2) {
          i += 2;
        } else {
          i++;
        }
      }
      return measurements;
    }, category);

    return measurement;
  } catch (error) {
    console.error(error);
  }
};

module.exports = measurements;
