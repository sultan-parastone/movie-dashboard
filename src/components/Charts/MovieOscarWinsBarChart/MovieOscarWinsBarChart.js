import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { fetchMoviesData } from "../../../utils/fetchData";
import "./MovieOscarWinsBarChart.css";

const MovieOscarWinsBarChart = () => {
    const [movies, setMovies] = useState([]);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchMoviesData();
                setMovies(data);

                // Data Processing for the chart
                const processedData = data
                    .map((movie) => {
                        const match = movie.awards.match(/Won (\d+) Oscars/);
                        return {
                            title: movie.title,
                            oscars: match ? parseInt(match[1], 10) : 0,
                        };
                    })
                    .filter((movie) => movie.oscars > 0); 

                setChartData(processedData);
            } catch (err) {
                console.error("Error fetching movie data:", err);
            }
        };

        getData();
    }, []);

    if (chartData.length === 0) {
        return <p>No Oscar-winning data available.</p>;
    }

    return (
        <div className="oscar-wins-chart-container">
            <h5 className="chart-title">Oscar Wins by Movie</h5>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <XAxis dataKey="title" angle={-45} textAnchor="end" interval={0} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="oscars" fill="#87CEEB" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MovieOscarWinsBarChart;
