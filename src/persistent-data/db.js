import Dexie from "dexie";

export const db = new Dexie("mainDB");
db.version(2).stores({
  settings:
    "workDuration, restDuration, wantsMaxWhenTimerDone, wantsMinWhenTimerStart",
});
