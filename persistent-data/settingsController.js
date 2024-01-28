import { db } from "./db";

export const settingsController = {
  // Get all settings
  getAllSettings: async () => {
    try {
      const settings = await db.settings.toArray();
      return settings[0]; // Assuming there's only one settings entry
    } catch (error) {
      console.error("Error getting settings:", error);
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
