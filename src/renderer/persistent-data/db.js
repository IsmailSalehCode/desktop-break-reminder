import Dexie from "dexie";

export const db = new Dexie("mainDB");
db.version(7).stores({
  settings:
    "++id,workDuration, restDuration, wantsMaxWhenTimerElapsed, wantsMinWhenTimerStart, wantsTrayMsgWhenTimerElapsed, bgHexTimerRunning,bgHexTimerPaused",
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
    wantsTrayMsgWhenTimerElapsed: true,
    bgHexTimerRunning: "unset",
    bgHexTimerPaused: "unset",
  });
}

async function initializeSettingsTable() {
  if (await isSettingsTableEmpty()) {
    await createDefaultRow();
  }
}

initializeSettingsTable();
