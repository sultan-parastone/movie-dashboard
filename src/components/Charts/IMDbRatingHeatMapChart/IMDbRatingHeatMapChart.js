import React, { useEffect, useState } from "react";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from "recharts";
import { fetchMoviesData } from "../../../utils/fetchData";
import "./IMDbRatingHeatMapChart.css";

const IMDbRatingHeatmapChart = () => {
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState("");

    const getData = async () => {
        try {
            const data = await fetchMoviesData();

            // Group movies by year and calculate the average rating
            const yearRatings = {};

            data.forEach((movie) => {
                if (yearRatings[movie.year]) {
                    yearRatings[movie.year].push(movie.rating);
                } else {
                    yearRatings[movie.year] = [movie.rating];
                }
            });

            const formattedData = Object.entries(yearRatings).map(([year, ratings]) => ({
                year: parseInt(year, 10),
                averageRating:
                    ratings.reduce((total, rating) => total + rating, 0) / ratings.length,
            }));

            setChartData(formattedData);
        } catch (err) {
            setError("Failed to fetch IMDb ratings data.");
            console.error("Error fetching IMDb ratings data:", err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (error) return <p>{error}</p>;
    if (chartData.length === 0) return <p>Loading...</p>;

    return (
        <div className="imdb-rating-heatmap-chart">
            <h5 className="chart-title">IMDb Ratings vs Year</h5>
            <ResponsiveContainer width="100%" height={300}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                    <XAxis
                        type="number"
                        dataKey="year"
                        name="Year"
                        domain={["dataMin", "dataMax"]}
                        allowDecimals={false}
                    />
                    <YAxis
                        type="number"
                        dataKey="averageRating"
                        name="IMDb Rating"
                        domain={[0, 10]}
                        ticks={[0, 2, 4, 6, 8, 10]}
                    />
                    <ZAxis type="number" range={[50, 400]} />
                    <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                    <Scatter
                        name="IMDb Ratings"
                        data={chartData}
                        fill="#8884d8"
                        shape="circle"
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default IMDbRatingHeatmapChart;
