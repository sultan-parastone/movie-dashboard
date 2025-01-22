import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { fetchMoviesData } from "../../../utils/fetchData";
import "./GenrePopularityPieChart.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"];

const GenrePopularityPieChart = () => {
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState("");

    const getData = async () => {
        try {
            const data = await fetchMoviesData();

            const genreCounts = {};

            // Process genres from each movie
            data.forEach((movie) => {
                movie.genre.forEach((genre) => {
                    if (genreCounts[genre]) {
                        genreCounts[genre] += 1;
                    } else {
                        genreCounts[genre] = 1;
                    }
                });
            });

            // Converting to chart-friendly format
            const formattedData = Object.entries(genreCounts).map(
                ([genre, count]) => ({
                    name: genre,
                    value: count,
                })
            );

            setChartData(formattedData);
        } catch (err) {
            setError("Failed to fetch genre data.");
            console.error("Error fetching genre data:", err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (error) return <p>{error}</p>;
    if (chartData.length === 0) return <p>Loading...</p>;

    return (
        <div className="genre-popularity-chart">
            <h5 className="chart-title">Genre Popularity</h5>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={({ name, percent }) =>
                            `${name} (${(percent * 100).toFixed(1)}%)`
                        }
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GenrePopularityPieChart;
