const iFrames = async (page, category) => {
  try {
    let iFrames = await page.evaluate((category) => {
      const frames = {
        photoFrame: "",
        descriptionFrame: "",
        additionalButton: "",
      };

      const description = document.querySelector("div.ifrmc").children[0].id;
      const photo = document.querySelector("#uploader_inline").children[0].id;
      let additionalBtn;
      if (category === "modern") {
        additionalBtn =
          document.querySelector("#optFooterId").children[1].children[0]
            .className;
      }

      frames.photoFrame = `#${photo}`;
      frames.descriptionFrame = `#${description}`;
      frames.additionalButton =
        category === "modern" ? `.${additionalBtn}` : "";

      return frames;
    }, category);

    return iFrames;
  } catch (error) {
    console.error(error);
  }
};

module.exports = iFrames;
