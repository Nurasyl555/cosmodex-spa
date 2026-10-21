import React, { useState, useEffect } from "react";
import { api } from "./services/api";
import { Navbar } from "./components/Navbar";
import { FilterBar } from "./components/FilterBar";
import { PlanetCard } from "./components/PlanetCard";
import { Pagination } from "./components/Pagination";
import { PlanetDetailModal } from "./components/PlanetDetailModal";
import { AddPlanetModal } from "./components/AddPlanetModal";
import { StatusView } from "./components/StatusView";

export function App() {
  const [planets, setPlanets] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1, limit: 12 });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("ALL");
  const [habitable, setHabitable] = useState("ALL");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleSearchChange = (val) => {
    setSearch(val);
    setPage(1);
  };

  const handleTypeChange = (val) => {
    setType(val);
    setPage(1);
  };

  const handleHabitableChange = (val) => {
    setHabitable(val);
    setPage(1);
  };

  const handleSortByChange = (val) => {
    setSortBy(val);
    setPage(1);
  };

  const handleSortOrderToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setType("ALL");
    setHabitable("ALL");
    setSortBy("name");
    setSortOrder("asc");
    setPage(1);
  };

  useEffect(() => {
    let isCancelled = false;

    const fetchPlanets = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await api.getPlanets({
          search,
          type,
          habitable,
          sortBy,
          sortOrder,
          page,
          limit: 12
        });

        if (!isCancelled) {
          setPlanets(response.data);
          setPagination(response.pagination);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || "Ошибка загрузки планет");
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchPlanets();

    return () => {
      isCancelled = true;
    };
  }, [search, type, habitable, sortBy, sortOrder, page]);

  const handleAddPlanet = async (newPlanetData) => {
    const created = await api.createPlanet(newPlanetData);
    showNotification(`Планета "${created.name}" успешно занесена в каталог!`);
    setPage(1);
    handleResetFilters();
  };

  const handleResetToDefaults = async () => {
    if (window.confirm("Восстановить исходные 105 записей каталога?")) {
      await api.resetToDefaults();
      showNotification("База данных восстановлена до начальных 105 миров!");
      handleResetFilters();
    }
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 3500);
  };

  return (
    <div className="app-layout">
      <Navbar
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onResetToDefaults={handleResetToDefaults}
        totalPlanets={pagination.total}
      />

      {notification && <div className="toast-notification">{notification}</div>}

      <main className="main-content">
        <FilterBar
          search={search}
          onSearchChange={handleSearchChange}
          type={type}
          onTypeChange={handleTypeChange}
          habitable={habitable}
          onHabitableChange={handleHabitableChange}
          sortBy={sortBy}
          onSortByChange={handleSortByChange}
          sortOrder={sortOrder}
          onSortOrderToggle={handleSortOrderToggle}
          onReset={handleResetFilters}
          totalResults={pagination.total}
        />

        {isLoading ? (
          <StatusView type="loading" />
        ) : error ? (
          <StatusView
            type="error"
            message={error}
            onRetry={() => {
              setPage((p) => p);
            }}
          />
        ) : planets.length === 0 ? (
          <StatusView type="empty" onResetFilters={handleResetFilters} />
        ) : (
          <>
            <div className="planets-grid">
              {planets.map((planet) => (
                <PlanetCard
                  key={planet.id}
                  planet={planet}
                  onSelect={(item) => setSelectedPlanet(item)}
                />
              ))}
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(newPage) => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </>
        )}
      </main>

      {selectedPlanet && (
        <PlanetDetailModal
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}

      <AddPlanetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPlanet={handleAddPlanet}
      />
    </div>
  );
}

export default App;
