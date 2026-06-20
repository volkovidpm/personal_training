import { describe, it, expect, beforeEach } from "vitest";
import { read, write, remove } from "./storage";
import { installMemoryStorage, removeStorage } from "../test/memoryStorage";

describe("storage с доступным localStorage", () => {
  beforeEach(() => {
    installMemoryStorage();
  });

  it("сохраняет и читает значение (round-trip)", () => {
    write("k", { a: 1, b: ["x"] });
    expect(read("k", null)).toEqual({ a: 1, b: ["x"] });
  });

  it("возвращает fallback для отсутствующего ключа", () => {
    expect(read("missing", "def")).toBe("def");
  });

  it("удаляет значение", () => {
    write("k", 5);
    remove("k");
    expect(read("k", "gone")).toBe("gone");
  });
});

describe("storage без localStorage", () => {
  beforeEach(() => {
    removeStorage();
  });

  it("read возвращает fallback, write не падает", () => {
    expect(() => write("k", 1)).not.toThrow();
    expect(read("k", "fb")).toBe("fb");
  });
});
