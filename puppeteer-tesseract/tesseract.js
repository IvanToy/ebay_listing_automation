const { createWorker } = require("tesseract.js");

const worker = createWorker({
  logger: (m) => console.log(m),
});

const getTextFromImage = async (photo, isTerminated = false) => {
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");

  const {
    data: { text },
  } = await worker.recognize(photo);

  if (isTerminated) {
    await worker.terminate();
  }
  console.log(isTerminated);

  const capturedText = text.split(/\n/g).filter((phrase) => phrase !== "");
  const turningIntoObject = capturedText.map((phrase) => phrase.split(":"));
  const obj = {};
  console.log(capturedText);
  for (let i = 0; i < turningIntoObject.length; i++) {
    const [key, value] = turningIntoObject[i];
    obj[key] = value;
  }
  //console.log(obj);
  return obj;
};
//getTextFromImage();

module.exports = getTextFromImage;
