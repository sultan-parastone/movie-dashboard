import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fetchMoviesData } from "../../../utils/fetchData";
import "./MoviesGenreBarChart.css";

const MoviesGenreBarChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchMoviesData();

                // Process the data to count movies per genre
                const genreCounts = {};
                data.forEach((movie) => {
                    movie.genre.forEach((genre) => {
                        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                    });
                });

                // Converting genreCounts into an array suitable for Recharts
                const processedData = Object.entries(genreCounts).map(([genre, count]) => ({
                    genre,
                    count,
                }));

                setChartData(processedData);
            } catch (err) {
                console.error("Error fetching movie data:", err);
            }
        };

        getData();
    }, []);

    if (chartData.length === 0) {
        return <p>No genre data available.</p>;
    }

    return (
        <div className="genre-chart-container">
            <h5 className="chart-title">Movies per Genre</h5>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <XAxis dataKey="genre" angle={-45} textAnchor="end" interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Movies" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MoviesGenreBarChart;
