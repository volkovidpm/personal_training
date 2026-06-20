// Типизированная обёртка над localStorage с пространством имён fitplan:*.
// Безопасно работает, если localStorage недоступен (SSR/тесты без полифилла).

const NS = "fitplan:";

function backend(): Storage | null {
  try {
    return globalThis.localStorage ?? null;
  } catch {
    return null;
  }
}

export function read<T>(key: string, fallback: T): T {
  const store = backend();
  if (!store) return fallback;
  const raw = store.getItem(NS + key);
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function write<T>(key: string, value: T): void {
  const store = backend();
  if (!store) return;
  try {
    store.setItem(NS + key, JSON.stringify(value));
  } catch {
    // переполнение/приватный режим — молча игнорируем
  }
}

export function remove(key: string): void {
  backend()?.removeItem(NS + key);
}

// Ключи хранилища — в одном месте, чтобы не плодить «магические строки».
// Версия в значении ключа позволяет менять формат данных в будущем.
export const KEYS = {
  exercises: "exercises:v1", // только пользовательские упражнения
  weeks: "weeks:v1", // планы недель
  settings: "settings:v1",
} as const;
