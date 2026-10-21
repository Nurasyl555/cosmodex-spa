import React from "react";
import { Loader2, AlertCircle, SearchX } from "lucide-react";

export const StatusView = ({ type, message, onRetry, onResetFilters }) => {
  if (type === "loading") {
    return (
      <div className="status-container status-loading">
        <Loader2 className="spinner-icon" size={44} />
        <p className="status-title">Сканирование звездного сектора...</p>
        <p className="status-subtitle">Получение телеметрических данных через Simulated API</p>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className="status-container status-error">
        <AlertCircle size={44} className="error-icon" />
        <h3 className="status-title">Сбой соединения с космической базой</h3>
        <p className="status-subtitle">{message || "Произошла непредвиденная ошибка при запросе данных."}</p>
        {onRetry && (
          <button className="btn btn-primary" onClick={onRetry}>
            Повторить попытку
          </button>
        )}
      </div>
    );
  }

  if (type === "empty") {
    return (
      <div className="status-container status-empty">
        <SearchX size={44} className="empty-icon" />
        <h3 className="status-title">Экзопланеты не обнаружены</h3>
        <p className="status-subtitle">
          По текущим параметрам поиска и фильтрам совпадений нет. Попробуйте изменить критерии.
        </p>
        {onResetFilters && (
          <button className="btn btn-outline" onClick={onResetFilters}>
            Сбросить все фильтры
          </button>
        )}
      </div>
    );
  }

  return null;
};
