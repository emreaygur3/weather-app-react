export const getRandomCoordinates = () => {
    const lat = 36 + Math.random() * (42 - 36);
    const lon = 26 + Math.random() * (45 - 26);
    return { lat, lon };
  };
  