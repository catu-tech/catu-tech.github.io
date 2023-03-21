import IncognitoStorage from '@/lib/IncognitoStorage';

export function clearStorage(): any {
  try {
    localStorage.clear();
  } catch (e) {
    console.groupCollapsed('[STORAGE/clearStorage]: Using in-memory storage.');
    console.error(e);
    console.groupEnd();

    IncognitoStorage.clear();
  }
}

export function getStorage(key: string): any {
  let data: any = null;

  try {
    data = localStorage.getItem(key);
  } catch (e) {
    console.groupCollapsed('[STORAGE/getStorage]: Using in-memory storage.');
    console.error(e);
    console.groupEnd();

    IncognitoStorage.getItem(key);
  }

  return JSON.parse(data ?? '{}');
}

export function removeStorage(key: string) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.groupCollapsed('[STORAGE/removeStorage]: Using in-memory storage.');
    console.error(e);
    console.groupEnd();

    IncognitoStorage.removeItem(key);
  }
}

export function setStorage(key: string, data: any) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.groupCollapsed('[STORAGE/setStorage]: Using in-memory storage.');
    console.error(e);
    console.groupEnd();

    IncognitoStorage.setItem(key, JSON.stringify(data));
  }
}

export function storageKey(index: number): string | null {
  let key: string | null = null;

  try {
    key = localStorage.key(index);
  } catch (e) {
    console.groupCollapsed('[STORAGE/storageKey]: Using in-memory storage.');
    console.error(e);
    console.groupEnd();

    key = IncognitoStorage.key(index);
  }

  return key;
}

export function storageLength(): number {
  let length: number = 0;

  try {
    length = localStorage.length;
  } catch (e) {
    console.groupCollapsed('[STORAGE/storageLength]: Using in-memory storage.');
    console.error(e);
    console.groupEnd();

    length = IncognitoStorage.length;
  }

  return length;
}
