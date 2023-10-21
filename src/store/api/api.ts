import axios from "axios";

const API_BASE_URL = "https://api.spacexdata.com/v3/launches";

export const fetchLaunches = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
