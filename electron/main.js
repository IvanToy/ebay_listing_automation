const { app, BrowserWindow, ipcMain } = require("electron");
const main = require("../puppeteer-tesseract/index.js");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  mainWindow.loadFile(`${__dirname}/index.html`);

  mainWindow.on("closed", () => (mainWindow = null));
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on("send-chosen-options", (event, args) => {
  main(args);
});

process.platform === "win32" && Menu.setApplicationMenu(null);
