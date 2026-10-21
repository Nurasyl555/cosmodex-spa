import React, { useState } from "react";
import { X, PlusCircle, AlertTriangle } from "lucide-react";

const INITIAL_FORM_STATE = {
  name: "",
  hostStar: "",
  type: "Terrestrial",
  distanceLightYears: "",
  discoveryYear: new Date().getFullYear(),
  surfaceTempKelvin: 288,
  massEarths: 1.0,
  habitable: false,
  mission: "James Webb Space Telescope",
  description: ""
};

export const AddPlanetModal = ({ isOpen, onClose, onAddPlanet }) => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Введите название экзопланеты (например: Kepler-186f)";
    }
    if (!formData.hostStar.trim()) {
      newErrors.hostStar = "Укажите родительскую звезду";
    }
    if (!formData.distanceLightYears || Number(formData.distanceLightYears) <= 0) {
      newErrors.distanceLightYears = "Расстояние должно быть положительным числом";
    }
    if (!formData.massEarths || Number(formData.massEarths) <= 0) {
      newErrors.massEarths = "Масса должна быть больше 0";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      await onAddPlanet(formData);
      setFormData(INITIAL_FORM_STATE);
      onClose();
    } catch (err) {
      setErrors({ form: err.message || "Не удалось сохранить планету" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content modal-form" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <PlusCircle className="icon-accent" size={24} />
            <h2 className="modal-title">Регистрация новой экзопланеты</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="planet-form">
          {errors.form && (
            <div className="form-error-banner">
              <AlertTriangle size={18} /> {errors.form}
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Название планеты *</label>
              <input
                type="text"
                name="name"
                className={`form-input ${errors.name ? "input-error" : ""}`}
                placeholder="напр. Kepler-90 i"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Родительская звезда *</label>
              <input
                type="text"
                name="hostStar"
                className={`form-input ${errors.hostStar ? "input-error" : ""}`}
                placeholder="напр. Kepler-90"
                value={formData.hostStar}
                onChange={handleChange}
              />
              {errors.hostStar && <span className="error-text">{errors.hostStar}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Класс мира</label>
              <select
                name="type"
                className="form-input"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Terrestrial">Каменистая (Terrestrial)</option>
                <option value="Super-Earth">Суперземля (Super-Earth)</option>
                <option value="Gas Giant">Газовый гигант (Gas Giant)</option>
                <option value="Neptune-like">Ледяной гигант (Neptune-like)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Миссия / Телескоп</label>
              <select
                name="mission"
                className="form-input"
                value={formData.mission}
                onChange={handleChange}
              >
                <option value="James Webb Space Telescope">James Webb Space Telescope</option>
                <option value="Kepler Space Telescope">Kepler Space Telescope</option>
                <option value="TESS (Transiting Exoplanet Survey Satellite)">TESS Satellite</option>
                <option value="Hubble Space Telescope">Hubble Space Telescope</option>
                <option value="Ground-based Observatory">Наземная обсерватория</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Расстояние (св. лет) *</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                name="distanceLightYears"
                className={`form-input ${errors.distanceLightYears ? "input-error" : ""}`}
                placeholder="напр. 42.5"
                value={formData.distanceLightYears}
                onChange={handleChange}
              />
              {errors.distanceLightYears && (
                <span className="error-text">{errors.distanceLightYears}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Масса (в массах Земли) *</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                name="massEarths"
                className={`form-input ${errors.massEarths ? "input-error" : ""}`}
                placeholder="напр. 1.25"
                value={formData.massEarths}
                onChange={handleChange}
              />
              {errors.massEarths && <span className="error-text">{errors.massEarths}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Температура поверхности (Kelvin)</label>
              <input
                type="number"
                min="0"
                name="surfaceTempKelvin"
                className="form-input"
                value={formData.surfaceTempKelvin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Год открытия</label>
              <input
                type="number"
                min="1990"
                max={new Date().getFullYear()}
                name="discoveryYear"
                className="form-input"
                value={formData.discoveryYear}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="habitable"
                checked={formData.habitable}
                onChange={handleChange}
              />
              <span>Потенциально обитаемый мир (в зоне жизни)</span>
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Научное описание / заметки</label>
            <textarea
              name="description"
              className="form-input form-textarea"
              rows={3}
              placeholder="Краткое описание планеты, особенности атмосферы или открытия..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? "Регистрация..." : "Добавить в каталог"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
