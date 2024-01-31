import Dexie from "dexie";

export const db = new Dexie("mainDB");
db.version(2).stores({
  settings:
    "++id,workDuration, restDuration, wantsMaxWhenTimerElapsed, wantsMinWhenTimerStart, hexBackgroundColorWhenTimerElapsed,hexBackgroundColorWhileTimerRunning",
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
    hexBackgroundColorWhenTimerElapsed: "#800000",
    hexBackgroundColorWhileTimerRunning: "#232628",
  });
}

async function initializeSettingsTable() {
  if (await isSettingsTableEmpty()) {
    await createDefaultRow();
  }
}

initializeSettingsTable();
