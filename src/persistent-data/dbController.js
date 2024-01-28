import { db } from "./db";

export const SettingsController = {
  // Get all settings
  getAllSettings: async () => {
    try {
      const settings = await db.settings.get(1);
      return settings; // Assuming there's only one settings entry
    } catch (error) {
      console.error("Error getting settings:", error);
      throw error;
    }
  },

  // Update multiple settings at once
  updateSettings: async (newSettings) => {
    try {
      console.log(newSettings);
      await db.settings.update(1, newSettings);
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  },

  // Update a specific setting
  updateSetting: async (settingName, settingValue) => {
    try {
      await db.settings.update(1, { [settingName]: settingValue });
    } catch (error) {
      console.error(`Error updating ${settingName} setting:`, error);
      throw error;
    }
  },
};
