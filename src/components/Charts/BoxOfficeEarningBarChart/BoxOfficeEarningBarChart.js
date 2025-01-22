import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { fetchMoviesData } from "../../../utils/fetchData";
import "./BoxOfficeEarningBarChart.css";

const BoxOfficeEarningBarChart = () => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchMoviesData();

                // Process data for box office earnings
                const processedData = data.map((movie) => {
                    const match = movie.boxOffice.match(/\$(\d+(\.\d+)?)\s*(million|billion)/i);
                    let boxOfficeValue = 0;

                    if (match) {
                        boxOfficeValue = parseFloat(match[1]);
                        if (match[3].toLowerCase() === "million") boxOfficeValue /= 1000; 
                    }

                    return {
                        title: movie.title,
                        boxOffice: boxOfficeValue,
                    };
                });

                setChartData(processedData);
            } catch (err) {
                console.error("Error fetching movie data:", err);
            }
        };

        getData();
    }, []);

    if (chartData.length === 0) {
        return <p>No box office data available.</p>;
    }

    return (
        <div className="box-office-chart-container">
            <h5 className="chart-title">Box Office Earnings</h5>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <XAxis dataKey="title" angle={-45} textAnchor="end" interval={0} />
                    <YAxis label={{ value: "Revenue (in billions)", angle: -90, position: "insideLeft" }} />
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}B`} />
                    <Legend />
                    <Bar dataKey="boxOffice" name="Box Office Revenue" fill="#FFA500" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BoxOfficeEarningBarChart;
