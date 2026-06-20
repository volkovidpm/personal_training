import { useRef } from "react";
import { useHashRoute } from "./lib/useHashRoute";
import { useExercises } from "./state/exercises";
import { useWeeks } from "./state/weeks";
import {
  buildBackup,
  serialize,
  parseBackup,
} from "./lib/exportImport";
import { WeekView } from "./views/WeekView";
import { LibraryView } from "./views/LibraryView";

const NAV: { view: string; label: string }[] = [
  { view: "week", label: "Неделя" },
  { view: "library", label: "Библиотека" },
];

export function App() {
  const route = useHashRoute();
  const fileInput = useRef<HTMLInputElement>(null);

  // Экспорт: собираем пользовательские упражнения + все недели в JSON-файл.
  function handleExport() {
    const data = buildBackup(
      useExercises.getState().custom,
      useWeeks.getState().weeks
    );
    const blob = new Blob([serialize(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `training-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Импорт: читаем файл, заменяем упражнения и недели.
  async function handleImportFile(file: File) {
    try {
      const data = parseBackup(await file.text());
      useExercises.getState().replaceCustom(data.exercises);
      useWeeks.getState().replaceWeeks(data.weeks);
      alert("Данные импортированы");
    } catch (err) {
      alert(`Не удалось импортировать: ${(err as Error).message}`);
    }
  }

  return (
    <div className="app">
      <header className="topbar">
        <a className="brand" href="#/week" aria-label="На главную">
          <span className="brand-mark">🏋️</span> Тренировки
        </a>
        <nav className="nav">
          {NAV.map((n) => (
            <a
              key={n.view}
              href={`#/${n.view}`}
              className={route.view === n.view ? "nav-link active" : "nav-link"}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="topbar-actions">
          <button className="btn-ghost" onClick={handleExport} title="Скачать бэкап">
            Экспорт
          </button>
          <button
            className="btn-ghost"
            onClick={() => fileInput.current?.click()}
            title="Загрузить бэкап"
          >
            Импорт
          </button>
          <input
            ref={fileInput}
            type="file"
            accept="application/json"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleImportFile(file);
              e.target.value = "";
            }}
          />
        </div>
      </header>

      <main className="content">
        {route.view === "library" ? (
          <LibraryView param={route.param} />
        ) : (
          <WeekView />
        )}
      </main>
    </div>
  );
}
