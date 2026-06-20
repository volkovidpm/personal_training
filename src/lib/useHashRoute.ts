// Простейший роутинг по hash: #/week, #/library, #/library/bench-press.
import { useEffect, useState } from "react";

export interface Route {
  view: string; // week | library
  param?: string; // id упражнения и т.п.
}

function parse(): Route {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [view, param] = raw.split("/");
  return { view: view || "week", param: param || undefined };
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parse);
  useEffect(() => {
    const onChange = () => setRoute(parse());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function go(view: string, param?: string): void {
  window.location.hash = param ? `#/${view}/${param}` : `#/${view}`;
}
