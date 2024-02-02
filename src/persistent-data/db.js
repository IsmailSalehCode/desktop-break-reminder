import Dexie from "dexie";

export const db = new Dexie("mainDB");
db.version(5).stores({
  settings:
    "++id,workDuration, restDuration, wantsMaxWhenTimerElapsed, wantsMinWhenTimerStart, bgHexTimerPaused,bgHexTimerRunning, wantsTrayMsgWhenTimerElapsed",
});

async function isSettingsTableEmpty() {
  const settingsCount = await db.settings.count();
  return settingsCount === 0;
}

async function createDefaultRow() {
  await db.settings.add({
    workDuration: 7200,
    restDuration: 900,
    wantsMaxWhenTimerElapsed: false,
    wantsMinWhenTimerStart: false,
    bgHexTimerPaused: "#228B22",
    bgHexTimerRunning: "#FF0000",
    wantsTrayMsgWhenTimerElapsed: true,
  });
}

async function initializeSettingsTable() {
  if (await isSettingsTableEmpty()) {
    await createDefaultRow();
  }
}

initializeSettingsTable();
