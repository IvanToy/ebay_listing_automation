const { createWorker } = require("tesseract.js");

const worker = createWorker({
  logger: (m) => console.log(m),
});

const getTextFromImage = async (photo) => {
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  const {
    data: { text },
  } = await worker.recognize(photo);

  const capturedText = text.split(/\n/g).filter((phrase) => phrase !== "");
  const turningIntoObject = capturedText.map((phrase) => phrase.split(":"));
  const obj = {};

  for (let i = 0; i < turningIntoObject.length; i++) {
    const [key, value] = turningIntoObject[i];
    obj[key] = value;
  }

  return obj;
};

module.exports = getTextFromImage;
