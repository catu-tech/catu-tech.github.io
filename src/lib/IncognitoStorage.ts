/**
 * Implements an in-memory storage, using a singleton.
 */
class IncognitoStorageHandler implements Storage {
  protected static INSTANCE: IncognitoStorageHandler;

  protected keys: Array<string> = [];

  protected storage: Map<string, any> = new Map();

  constructor() {
    if (IncognitoStorageHandler.INSTANCE)
      return IncognitoStorageHandler.INSTANCE;
    IncognitoStorageHandler.INSTANCE = this;
  }

  get length(): number {
    return this.storage.size;
  }

  key(index: number): string {
    return this.keys[index];
  }

  getItem(key: string): any {
    return this.storage.get(key);
  }

  setItem(key: string, value: any): void {
    this.storage.set(key, JSON.stringify(value));
    this.updateKeys();
  }

  removeItem(key: string): void {
    this.storage.delete(key);
    this.updateKeys();
  }

  clear() {
    this.storage.clear();
    this.keys = [];
  }

  private updateKeys() {
    this.keys = Array.from(this.storage.keys());
  }
}

const IncognitoStorage = new IncognitoStorageHandler();

export default IncognitoStorage;
