export const API_BASE = "http://10.247.208.191:5000/api"; // change IP to your system's IPv4

export const fetchLawSituations = async () => {
  try {
    const response = await fetch(`${API_BASE}/lawsituations`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching law situations:", error);
    return [];
  }
};

export default API_BASE;
