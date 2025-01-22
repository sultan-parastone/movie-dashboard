import axios from "axios";

const API_URL = "https://www.freetestapi.com/api/v1/movies";

export const fetchMoviesData = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; 
    } catch (error) {
        console.error("Error fetching movies data:", error);
        throw error; 
    }
};
