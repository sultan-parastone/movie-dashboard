import React, { useEffect, useState } from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";
import { fetchMoviesData } from "../../../utils/fetchData";
import './LanguageDistributionPieChart.css';

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00c49f"];

const LanguageDistributionPieChart = () => {
    const [chartData, setChartData] = useState([]);
    const [error, setError] = useState("");

    const getData = async () => {
        try {
            const data = await fetchMoviesData();

            const languageCounts = {};

            data.forEach((movie) => {
                // Handle both array and string types for the 'language' field
                const languages = Array.isArray(movie.language)
                    ? movie.language
                    : typeof movie.language === "string"
                    ? movie.language.split(",").map((lang) => lang.trim())
                    : []; // Handle invalid data

                languages.forEach((lang) => {
                    if (languageCounts[lang]) {
                        languageCounts[lang] += 1;
                    } else {
                        languageCounts[lang] = 1;
                    }
                });
            });

            // Convert languageCounts object to an array suitable for recharts
            const formattedData = Object.entries(languageCounts).map(
                ([language, count]) => ({
                    name: language,
                    value: count,
                })
            );

            setChartData(formattedData);
        } catch (err) {
            setError("Failed to fetch language distribution data.");
            console.error("Error fetching movie data:", err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (error) return <p>{error}</p>;
    if (chartData.length === 0) return <p>Loading...</p>;

    return (
        <div className="language-distribution-chart">
            <h5 className="chart-title">Language Distribution</h5>
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

export default LanguageDistributionPieChart;
