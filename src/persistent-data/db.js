import Dexie from "dexie";

export const db = new Dexie("mainDB");
db.version(3).stores({
  settings:
    "++id,workDuration, restDuration, wantsMaxWhenTimerElapsed, wantsMinWhenTimerStart, bgHexTimerPaused,bgHexTimerRunning",
});

async function isSettingsTableEmpty() {
  const settingsCount = await db.settings.count();
  return settingsCount === 0;
}

async function createDefaultRow() {
  await db.settings.add({
    workDuration: 10,
    restDuration: 5,
    wantsMaxWhenTimerElapsed: false,
    wantsMinWhenTimerStart: false,
    bgHexTimerPaused: "#228B22",
    bgHexTimerRunning: "#FF0000",
  });
}

async function initializeSettingsTable() {
  if (await isSettingsTableEmpty()) {
    await createDefaultRow();
  }
}

initializeSettingsTable();
