import { join } from "path";
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  dialog,
  Menu,
  Tray,
  session,
} from "electron";
const isDev = process.env.IS_DEV == "true" ? true : false;

let tray;
const iconPath = join(__dirname, "../../assets/icon.ico");
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    title: "Break Reminder",
    width: 480,
    height: 480,
    webPreferences: {
      backgroundThrottling: false,
      preload: join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: iconPath,
  });

  mainWindow.removeMenu();

  /**
   * Source: https://pradyothkukkapalli.com/tech/open-external-urls-electron/
   * This handler prevents all window open requests from changing the URL inside your app, and instead causes the URL to open in the user’s browser. However, this only works if your links open new windows/tabs. You can have anchor tags with target="_blank", or call window.open with a _blank target */
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url); // Open URL in user's browser.
    return { action: "deny" }; // Prevent the app from opening the URL.
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
  } else {
    mainWindow.loadFile(join(app.getAppPath(), "renderer", "index.html"));
  }
  // Open the DevTools. TODO: remove dev tools from prod
  // if (isDev) {
  mainWindow.webContents.openDevTools();
  // }
}

function createTray() {
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Open",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "Quit",
      click: () => {
        app.quit();
      },
    },
  ]);

  tray.setToolTip(mainWindow.title);
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"],
      },
    });
  });

  createTray();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

ipcMain.on("bring-main-window-to-front", () => {
  if (mainWindow) {
    mainWindow.show();
  }
});

ipcMain.on("minimize-main-window", () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on("maximize-main-window", () => {
  if (mainWindow) {
    mainWindow.maximize();
  }
});

ipcMain.on("show-alert", (event, type, message) => {
  /**
   * Can be none, info, error, question or warning. On Windows, question displays the same icon as info, unless you set an icon using the icon option. On macOS, both warning and error display the same warning icon.
   */
  dialog.showMessageBoxSync({
    type: type,
    message: message,
    buttons: ["Ok"],
  });
});

ipcMain.on("show-system-tray-msg", (event, obj) => {
  tray.displayBalloon(obj);
});

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });
// TODO: remove locales folder from final build
/**
 * When using electron-builder, you can default to the locale en-US via
app.commandLine.appendSwitch('lang', 'en-US'); // before app.on('ready', ...)
and remove the unused locales from your electron project via the "afterPack" hook in the package.json
"build": { "afterPack": "./removeLocales.js", ... }
which could look like

//https://www.electron.build/configuration/configuration#afterpack
exports.default = async function(context) {
	//console.log(context)
	var fs = require('fs');
	var localeDir = context.appOutDir+'/locales/';

	fs.readdir(localeDir, function(err, files){
		//files is array of filenames (basename form)
		if(!(files && files.length)) return;
		for (var i = 0, len = files.length; i < len; i++) {
			var match = files[i].match(/en-US\.pak/); 
      //добави и bg-BG.pak
			if(match === null){
				fs.unlinkSync(localeDir+files[i]);
			}
		}
	});
}
 */
