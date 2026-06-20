// Генератор идентификаторов с запасным вариантом, если crypto.randomUUID
// недоступен (старые окружения/тесты).
export function uid(prefix = ""): string {
  let core: string;
  try {
    core = globalThis.crypto?.randomUUID?.() ?? "";
  } catch {
    core = "";
  }
  if (!core) {
    core = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
  return prefix ? `${prefix}-${core}` : core;
}
