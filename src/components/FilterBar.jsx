import React from "react";
import { Search, Filter, ArrowUpDown, RotateCcw } from "lucide-react";

const PLANET_TYPES = [
  { value: "ALL", label: "Все типы планет" },
  { value: "Terrestrial", label: "Каменистые (Terrestrial)" },
  { value: "Super-Earth", label: "Суперземли (Super-Earth)" },
  { value: "Gas Giant", label: "Газовые гиганты (Gas Giant)" },
  { value: "Neptune-like", label: "Ледяные (Neptune-like)" }
];

const HABITABLE_OPTIONS = [
  { value: "ALL", label: "Все зоны обитаемости" },
  { value: "YES", label: "Только пригодные для жизни (Habitable)" },
  { value: "NO", label: "Только экстремальные / необитаемые" }
];

const SORT_OPTIONS = [
  { value: "name", label: "По названию (алфавит)" },
  { value: "distanceLightYears", label: "По расстоянию от Земли" },
  { value: "discoveryYear", label: "По году открытия" },
  { value: "massEarths", label: "По массе планеты" }
];

export const FilterBar = ({
  search,
  onSearchChange,
  type,
  onTypeChange,
  habitable,
  onHabitableChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderToggle,
  onReset,
  totalResults
}) => {
  return (
    <section className="filter-bar">
      <div className="filter-row-top">
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Поиск экзопланеты по имени, родительской звезде..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          {search && (
            <button className="clear-search-btn" onClick={() => onSearchChange("")}>
              ✕
            </button>
          )}
        </div>

        <div className="results-count-badge">
          Найдено планет: <strong>{totalResults}</strong>
        </div>
      </div>

      <div className="filter-row-bottom">
        <div className="control-group">
          <label className="control-label">
            <Filter size={14} className="icon-inline" /> Тип мира:
          </label>
          <select
            className="select-input"
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
          >
            {PLANET_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">Зона жизни:</label>
          <select
            className="select-input"
            value={habitable}
            onChange={(e) => onHabitableChange(e.target.value)}
          >
            {HABITABLE_OPTIONS.map((h) => (
              <option key={h.value} value={h.value}>
                {h.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label className="control-label">
            <ArrowUpDown size={14} className="icon-inline" /> Сортировка:
          </label>
          <div className="sort-wrapper">
            <select
              className="select-input"
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value)}
            >
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <button
              className="btn btn-icon"
              title={sortOrder === "asc" ? "По возрастанию (А-Я, 0-9)" : "По убыванию (Я-А, 9-0)"}
              onClick={onSortOrderToggle}
            >
              {sortOrder === "asc" ? "▲ Возр." : "▼ Убыв."}
            </button>
          </div>
        </div>

        <button className="btn btn-reset" onClick={onReset} title="Сбросить все параметры">
          <RotateCcw size={15} className="icon-inline" /> Сброс
        </button>
      </div>
    </section>
  );
};
