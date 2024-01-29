import { db } from "./db";

export const SettingsController = {
  getAllSettings: async () => {
    try {
      const settings = await db.settings.get(1);
      return settings;
    } catch (error) {
      console.error("Error getting settings:", error);
      throw error;
    }
  },

  updateSettings: async (newSettings) => {
    try {
      console.log(newSettings);
      await db.settings.update(1, newSettings);
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  },
};
