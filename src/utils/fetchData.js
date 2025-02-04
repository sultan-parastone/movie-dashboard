// import axios from "axios";

// const API_URL = "http://www.freetestapi.com/api/v1/movies";

// export const fetchMoviesData = async () => {
//     try {
//         const response = await axios.get(API_URL);
//         return response.data; 
//     } catch (error) {
//         console.error("Error fetching movies data:", error);
//         throw error; 
//     }
// };



import axios from "axios";
import moviesData from "../data/movies.json"; // Importing local JSON as fallback

const API_URL = "http://www.freetestapi.com/api/v1/movies"; // External API URL

export const fetchMoviesData = async () => {
    try {
        const response = await axios.get(API_URL, { timeout: 5000 }); // 5-second timeout
        console.log("✅ API Data Loaded Successfully");
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching API data, loading fallback JSON:", error.message);
        
        // Return local JSON data if API fails
        return moviesData;
    }
};
