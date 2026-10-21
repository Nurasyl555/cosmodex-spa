import React from "react";
import { Rocket, Plus, RefreshCw } from "lucide-react";

export const Navbar = ({ onOpenAddModal, onResetToDefaults, totalPlanets }) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <Rocket className="brand-icon" size={26} />
          </div>
          <div>
            <h1 className="brand-title">COSMODEX</h1>
            <p className="brand-subtitle">Астрофизический каталог экзопланет и космических миссий</p>
          </div>
        </div>

        <div className="navbar-actions">
          <div className="database-badge" title="Всего объектов в базе данных">
            База: <strong>{totalPlanets} миров</strong>
          </div>

          <button
            className="btn btn-secondary"
            onClick={onResetToDefaults}
            title="Сбросить базу данных к начальным 105 записям"
          >
            <RefreshCw size={15} className="icon-inline" /> Сбросить БД
          </button>

          <button className="btn btn-primary" onClick={onOpenAddModal}>
            <Plus size={18} className="icon-inline" /> Добавить планету
          </button>
        </div>
      </div>
    </header>
  );
};
