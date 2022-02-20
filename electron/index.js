const { ipcRenderer } = require("electron");

const vintageGlasses = document.getElementById("vintage");
const modernGlasses = document.getElementById("modern");
const enteredBinNumber = document.getElementById("bin-number");

const form = document.querySelector(".form");

const submitHandler = (event) => {
  event.preventDefault();
  if (
    vintageGlasses.value !== "choose-option" &&
    modernGlasses.value === "choose-option"
  ) {
    ipcRenderer.send("send-chosen-options", [
      vintageGlasses.value,
      enteredBinNumber.value,
    ]);
  } else {
    ipcRenderer.send("send-chosen-options", [
      modernGlasses.value,
      enteredBinNumber.value,
    ]);
  }

  enteredBinNumber.value = "";
};

form.addEventListener("submit", submitHandler);
