const planetTypes = [
  "Terrestrial",
  "Super-Earth",
  "Gas Giant",
  "Neptune-like"
];

const starTypes = [
  "Red Dwarf (M-type)",
  "Yellow Dwarf (G-type)",
  "Orange Dwarf (K-type)",
  "White Dwarf",
  "Blue Giant (A-type)"
];

const famousPlanets = [
  { name: "Proxima Centauri b", type: "Terrestrial", distance: 4.2, habitable: true, mission: "ESO High Accuracy Radial Velocity", year: 2016, temp: 234, mass: 1.17, desc: "The closest known exoplanet to our Solar System, located in the habitable zone of Proxima Centauri." },
  { name: "Kepler-452b", type: "Super-Earth", distance: 1402, habitable: true, mission: "Kepler Space Telescope", year: 2015, temp: 265, mass: 5.0, desc: "Often referred to as 'Earth's Cousin', orbiting a sun-like star in the habitable zone." },
  { name: "TRAPPIST-1e", type: "Terrestrial", distance: 39.5, habitable: true, mission: "Spitzer Space Telescope", year: 2017, temp: 251, mass: 0.69, desc: "One of seven Earth-sized worlds in the ultracool dwarf star system TRAPPIST-1." },
  { name: "TRAPPIST-1d", type: "Terrestrial", distance: 39.5, habitable: true, mission: "Spitzer Space Telescope", year: 2017, temp: 288, mass: 0.38, desc: "A rocky temperate planet potentially harboring liquid surface water." },
  { name: "TRAPPIST-1f", type: "Terrestrial", distance: 39.5, habitable: true, mission: "Spitzer Space Telescope", year: 2017, temp: 219, mass: 1.04, desc: "A potentially ocean-covered planet in the habitable zone of TRAPPIST-1." },
  { name: "Kepler-22b", type: "Super-Earth", distance: 635, habitable: true, mission: "Kepler Space Telescope", year: 2011, temp: 262, mass: 9.1, desc: "The first transiting planet discovered by NASA's Kepler mission to orbit in the habitable zone." },
  { name: "Kepler-186f", type: "Terrestrial", distance: 582, habitable: true, mission: "Kepler Space Telescope", year: 2014, temp: 188, mass: 1.44, desc: "The first validated Earth-size planet to orbit a distant star in the habitable zone." },
  { name: "Kepler-16b", type: "Gas Giant", distance: 245, habitable: false, mission: "Kepler Space Telescope", year: 2011, temp: 190, mass: 105.0, desc: "A real-life Tatooine orbiting a pair of binary stars." },
  { name: "55 Cancri e", type: "Super-Earth", distance: 41, habitable: false, mission: "Spitzer Space Telescope", year: 2004, temp: 2200, mass: 8.63, desc: "A super-hot carbon-rich planet often nicknamed the 'Diamond Planet'." },
  { name: "WASP-12b", type: "Gas Giant", distance: 1410, habitable: false, mission: "Hubble Space Telescope", year: 2008, temp: 2500, mass: 448.0, desc: "An ultra-hot Jupiter being slowly torn apart and consumed by its host star." },
  { name: "HD 189733 b", type: "Gas Giant", distance: 64.5, habitable: false, mission: "Hubble Space Telescope", year: 2005, temp: 1200, mass: 362.0, desc: "Deep cobalt-blue world where it rains molten glass sideways in 7,000 km/h winds." },
  { name: "TOI-700 d", type: "Terrestrial", distance: 101.4, habitable: true, mission: "TESS (Transiting Exoplanet Survey Satellite)", year: 2020, temp: 269, mass: 1.72, desc: "An Earth-sized habitable zone planet discovered by NASA's TESS mission." },
  { name: "TOI-700 e", type: "Terrestrial", distance: 101.4, habitable: true, mission: "TESS (Transiting Exoplanet Survey Satellite)", year: 2023, temp: 273, mass: 0.95, desc: "Second Earth-sized planet found in the optimistic habitable zone of the TOI-700 system." },
  { name: "Gliese 667 Cc", type: "Super-Earth", distance: 23.6, habitable: true, mission: "ESO High Accuracy Radial Velocity", year: 2011, temp: 277, mass: 3.8, desc: "Orbits a red dwarf star in a triple-star stellar system in Scorpius." },
  { name: "LHS 1140 b", type: "Super-Earth", distance: 48.8, habitable: true, mission: "James Webb Space Telescope", year: 2017, temp: 230, mass: 5.6, desc: "A promising candidate for an ocean-covered water world with a nitrogen-rich atmosphere." }
];

export const generateInitialPlanets = () => {
  const list = [];
  let idCounter = 1;

  famousPlanets.forEach((p) => {
    list.push({
      id: `exo-${idCounter++}`,
      name: p.name,
      type: p.type,
      distanceLightYears: p.distance,
      habitable: p.habitable,
      mission: p.mission,
      discoveryYear: p.year,
      surfaceTempKelvin: p.temp,
      massEarths: p.mass,
      hostStar: p.name.split(" ")[0] || "Solar-like",
      starType: p.habitable ? "Red Dwarf (M-type)" : "Yellow Dwarf (G-type)",
      description: p.desc
    });
  });

  const prefixes = [
    { prefix: "Kepler", startNum: 20, mission: "Kepler Space Telescope" },
    { prefix: "K2", startNum: 18, mission: "Kepler Space Telescope" },
    { prefix: "TOI", startNum: 800, mission: "TESS (Transiting Exoplanet Survey Satellite)" },
    { prefix: "WASP", startNum: 33, mission: "Hubble Space Telescope" },
    { prefix: "Gliese", startNum: 436, mission: "CHEOPS (ESA)" },
    { prefix: "HD", startNum: 209458, mission: "James Webb Space Telescope" },
    { prefix: "CoRoT", startNum: 7, mission: "CHEOPS (ESA)" },
    { prefix: "Gaia", startNum: 101, mission: "Gaia Observatory" }
  ];

  const letters = ["b", "c", "d", "e"];

  let prefixIdx = 0;
  while (list.length < 105) {
    const pGroup = prefixes[prefixIdx % prefixes.length];
    const letter = letters[list.length % letters.length];
    const planetNum = pGroup.startNum + Math.floor(list.length / 3);
    const pName = `${pGroup.prefix}-${planetNum} ${letter}`;
    const type = planetTypes[list.length % planetTypes.length];
    const isHab = type === "Terrestrial" || (type === "Super-Earth" && list.length % 3 === 0);
    const dist = Math.round((20 + (list.length * 17.3)) * 10) / 10;
    const year = 2005 + (list.length % 20);
    const temp = Math.round(isHab ? 220 + (list.length % 70) : 100 + (list.length * 25));
    const mass = Math.round((isHab ? 0.8 + (list.length % 5) * 0.9 : 15 + (list.length % 300)) * 10) / 10;

    list.push({
      id: `exo-${idCounter++}`,
      name: pName,
      type: type,
      distanceLightYears: dist,
      habitable: isHab,
      mission: pGroup.mission,
      discoveryYear: year,
      surfaceTempKelvin: temp,
      massEarths: mass,
      hostStar: `${pGroup.prefix}-${planetNum}`,
      starType: starTypes[list.length % starTypes.length],
      description: `Discovered by the ${pGroup.mission} in ${year}. It is classified as a ${type.toLowerCase()} orbiting ${pGroup.prefix}-${planetNum} at ${dist} light-years from Earth.`
    });

    prefixIdx++;
  }

  return list;
};
