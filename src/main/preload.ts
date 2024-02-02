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
  showAlert: (type: string, message: string) => {
    ipcRenderer.send("show-alert", type, message);
  },
  showSystemTrayMessage: (obj: Object) => {
    ipcRenderer.send("show-system-tray-msg", obj);
  },
});
