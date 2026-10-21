import { generateInitialPlanets } from "../data/initialPlanets";

const STORAGE_KEY = "cosmodex_exoplanets_v1";
const NETWORK_DELAY_MS = 450;

const getStoredPlanets = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initial = generateInitialPlanets();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("Ошибка парсинга localStorage:", err);
    const initial = generateInitialPlanets();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
};

const saveStoredPlanets = (planets) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(planets));
};

export const api = {
  async getPlanets({
    search = "",
    type = "ALL",
    habitable = "ALL",
    mission = "ALL",
    sortBy = "name",
    sortOrder = "asc",
    page = 1,
    limit = 12
  } = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          let list = [...getStoredPlanets()];

          if (search.trim()) {
            const query = search.toLowerCase().trim();
            list = list.filter(
              (p) =>
                p.name.toLowerCase().includes(query) ||
                p.hostStar.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
          }

          if (type !== "ALL") {
            list = list.filter((p) => p.type === type);
          }

          if (habitable === "YES") {
            list = list.filter((p) => p.habitable === true);
          } else if (habitable === "NO") {
            list = list.filter((p) => p.habitable === false);
          }

          if (mission !== "ALL") {
            list = list.filter((p) => p.mission === mission);
          }

          list.sort((a, b) => {
            let valA = a[sortBy];
            let valB = b[sortBy];

            if (typeof valA === "string") {
              const comp = valA.localeCompare(valB);
              return sortOrder === "asc" ? comp : -comp;
            } else {
              return sortOrder === "asc" ? valA - valB : valB - valA;
            }
          });

          const totalRecords = list.length;
          const totalPages = Math.ceil(totalRecords / limit) || 1;
          const safePage = Math.max(1, Math.min(page, totalPages));
          const startIndex = (safePage - 1) * limit;
          const paginatedItems = list.slice(startIndex, startIndex + limit);

          resolve({
            data: paginatedItems,
            pagination: {
              total: totalRecords,
              page: safePage,
              totalPages: totalPages,
              limit: limit
            }
          });
        } catch (error) {
          reject(new Error("Ошибка при получении данных из базы планет"));
        }
      }, NETWORK_DELAY_MS);
    });
  },

  async getPlanetById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const planets = getStoredPlanets();
        const found = planets.find((p) => p.id === id);
        if (found) {
          resolve(found);
        } else {
          reject(new Error(`Планета с идентификатором ${id} не найдена`));
        }
      }, 250);
    });
  },

  async createPlanet(planetData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!planetData.name || !planetData.type) {
          return reject(new Error("Поля 'Название' и 'Тип' обязательны для заполнения"));
        }

        const planets = getStoredPlanets();
        const newRecord = {
          ...planetData,
          id: `exo-user-${Date.now()}`,
          discoveryYear: Number(planetData.discoveryYear) || new Date().getFullYear(),
          distanceLightYears: Number(planetData.distanceLightYears) || 10,
          surfaceTempKelvin: Number(planetData.surfaceTempKelvin) || 280,
          massEarths: Number(planetData.massEarths) || 1.0,
          habitable: Boolean(planetData.habitable)
        };

        const updated = [newRecord, ...planets];
        saveStoredPlanets(updated);
        resolve(newRecord);
      }, NETWORK_DELAY_MS);
    });
  },

  async resetToDefaults() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const initial = generateInitialPlanets();
        saveStoredPlanets(initial);
        resolve(initial);
      }, 300);
    });
  }
};
