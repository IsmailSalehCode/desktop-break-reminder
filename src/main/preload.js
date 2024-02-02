const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  maximizeMainWindow: () => {
    ipcRenderer.send("maximize-main-window");
  },
  minimizeMainWindow() {
    ipcRenderer.send("minimize-main-window");
  },
  bringMainWindowToFront: () => {
    ipcRenderer.send("bring-main-window-to-front");
  },
  showAlert: (type, message) => {
    ipcRenderer.send("show-alert", type, message);
  },
  showSystemTrayMessage: (obj) => {
    ipcRenderer.send("show-system-tray-msg", obj);
  },
});
