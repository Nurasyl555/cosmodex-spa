import React, { useEffect } from "react";
import { X, Sparkles, Orbit, Telescope, Thermometer, Weight, Compass, Calendar } from "lucide-react";

export const PlanetDetailModal = ({ planet, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!planet) return null;

  const tempCelsius = Math.round(planet.surfaceTempKelvin - 273.15);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-detail" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <span className="badge badge-primary">{planet.type}</span>
            <h2 className="modal-title">{planet.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Закрыть">
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          <div className={`habitable-banner ${planet.habitable ? "habitable" : "hostile"}`}>
            {planet.habitable ? (
              <>
                <Sparkles size={20} />
                <div>
                  <strong>Потенциально обитаемый мир</strong>
                  <p>Орбита находится в зоне Златовласки (где вода может оставаться жидкой).</p>
                </div>
              </>
            ) : (
              <>
                <Thermometer size={20} />
                <div>
                  <strong>Экстремальные условия среды</strong>
                  <p>Температура или гравитация не подходят для известной нам белковой жизни.</p>
                </div>
              </>
            )}
          </div>

          <div className="detail-grid">
            <div className="detail-card">
              <Compass className="detail-icon" size={20} />
              <span className="detail-label">Расстояние от Солнца</span>
              <span className="detail-value">{planet.distanceLightYears} световых лет</span>
            </div>

            <div className="detail-card">
              <Thermometer className="detail-icon" size={20} />
              <span className="detail-label">Температура поверхности</span>
              <span className="detail-value">
                {planet.surfaceTempKelvin} K ({tempCelsius}°C)
              </span>
            </div>

            <div className="detail-card">
              <Weight className="detail-icon" size={20} />
              <span className="detail-label">Масса объекта</span>
              <span className="detail-value">{planet.massEarths} масс Земли</span>
            </div>

            <div className="detail-card">
              <Calendar className="detail-icon" size={20} />
              <span className="detail-label">Год открытия</span>
              <span className="detail-value">{planet.discoveryYear} год</span>
            </div>

            <div className="detail-card">
              <Orbit className="detail-icon" size={20} />
              <span className="detail-label">Родительская звезда</span>
              <span className="detail-value">{planet.hostStar}</span>
              <small className="detail-sub">{planet.starType || "Звездная система"}</small>
            </div>

            <div className="detail-card">
              <Telescope className="detail-icon" size={20} />
              <span className="detail-label">Инструмент открытия</span>
              <span className="detail-value">{planet.mission}</span>
            </div>
          </div>

          <div className="detail-section">
            <h4 className="detail-section-title">Астрофизическая справка</h4>
            <p className="detail-description">{planet.description}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Закрыть обзор
          </button>
        </div>
      </div>
    </div>
  );
};
