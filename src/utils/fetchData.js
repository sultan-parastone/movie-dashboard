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
import moviesData from "../data/movies.json"; 

const API_URL = "https://www.freetestapi.com/api/v1/movies"; 

export const fetchMoviesData = async () => {
    try {
        const response = await axios.get(API_URL, { timeout: 5000 }); 
        console.log("API Data Loaded Successfully");
        return response.data;
    } catch (error) {
        console.error("Error fetching API data, loading fallback JSON:", error.message);
        return moviesData;
    }
};
