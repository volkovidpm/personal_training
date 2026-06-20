// Минимальный in-memory полифилл localStorage для тестов (environment: node).

class MemoryStorage {
  private map = new Map<string, string>();
  get length() {
    return this.map.size;
  }
  clear() {
    this.map.clear();
  }
  getItem(key: string) {
    return this.map.has(key) ? this.map.get(key)! : null;
  }
  setItem(key: string, value: string) {
    this.map.set(key, String(value));
  }
  removeItem(key: string) {
    this.map.delete(key);
  }
  key(i: number) {
    return Array.from(this.map.keys())[i] ?? null;
  }
}

export function installMemoryStorage(): void {
  Object.defineProperty(globalThis, "localStorage", {
    value: new MemoryStorage(),
    configurable: true,
    writable: true,
  });
}

export function removeStorage(): void {
  Object.defineProperty(globalThis, "localStorage", {
    get() {
      throw new Error("localStorage недоступен");
    },
    configurable: true,
  });
}
