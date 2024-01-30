import { db } from "./db";

const settingsRowId = 1;

export const SettingsController = {
  getAllSettings: async () => {
    try {
      const settings = await db.settings.get(settingsRowId);
      return settings;
    } catch (error) {
      console.error("Error getting settings:", error);
      throw error;
    }
  },

  getSpecificSetting: async (settingName) => {
    try {
      const settings = await db.settings.get(settingsRowId);
      return settings[settingName];
    } catch (err) {
      console.error("getRestDuration:", err);
      throw err;
    }
  },

  updateSettings: async (newSettings) => {
    try {
      console.log(newSettings);
      await db.settings.update(settingsRowId, newSettings);
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  },
};
