const getCityFromCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
    );
    const data = await response.json();
    return data.address.city || data.address.town || data.address.village || 'Unknown';
  } catch (error) {
    console.error('Error fetching city:', error);
    return 'Unknown';
  }
};

export default getCityFromCoords;
