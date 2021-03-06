import Storage from './sfjs/storageManager'

const LastExportDateKey = 'LastExportDateKey'
const DontShowAgainUnsupportedEditorsKey = 'DoNotShowAgainUnsupportedEditorsKey'

export default class UserPrefsManager {
  static instance = null
  static get() {
    if(this.instance == null) {
      this.instance = new UserPrefsManager();
    }
    return this.instance;
  }

  async setLastExportDate(date) {
    await Storage.get().setItem(LastExportDateKey, JSON.stringify(date));
    this.lastExportDate = date;
  }

  async clearLastExportDate() {
    this.lastExportDate = null;
    return Storage.get().clearKeys([LastExportDateKey]);
  }

  async getLastExportDate() {
    if(!this.lastExportDate) {
      let date = await Storage.get().getItem(LastExportDateKey);
      if(date) {
        this.lastExportDate = new Date(JSON.parse(date));
      }
    }

    return this.lastExportDate;
  }

  async setDontShowAgainEditorsNotSupported() {
    await Storage.get().setItem(DontShowAgainUnsupportedEditorsKey, JSON.stringify(true));
    this.dontShowAgainUnsupportedEditors = true;
  }

  async getDontShowAgainEditorsNotSupported() {
    if(this.dontShowAgainUnsupportedEditors === null || this.dontShowAgainUnsupportedEditors === undefined) {
      let dontShowAgain = await Storage.get().getItem(DontShowAgainUnsupportedEditorsKey);
      this.dontShowAgainUnsupportedEditors = dontShowAgain !== null;
    }

    return this.dontShowAgainUnsupportedEditors;
  }
}
