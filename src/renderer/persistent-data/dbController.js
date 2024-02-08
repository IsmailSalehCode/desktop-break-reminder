import { db } from "./db";

const settingsRowId = 1;

async function isSettingsUpdateRedundant(inputSettings) {
  const existingSettings = await SettingsController.getAllSettings();
  const inputObj = JSON.stringify(inputSettings);
  const existingObj = JSON.stringify(existingSettings);

  if (existingObj === inputObj) {
    return true;
  }
  return false;
}

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
      const isRedundant = await isSettingsUpdateRedundant(newSettings);
      if (isRedundant) {
        return 1;
      } else {
        await db.settings.update(settingsRowId, newSettings);
        return 0;
      }
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  },
};
