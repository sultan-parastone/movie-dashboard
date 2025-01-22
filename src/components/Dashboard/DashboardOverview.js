import React, { useState, useEffect } from 'react';
import StatsCard from '../Cards/StatsCard/StatsCard';
import { fetchMovies } from '../../utils/fetchData';

const DashboardOverview = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getMovies = async () => {
            const data = await fetchMovies();
            setMovies(data);
            setLoading(false);
        };

        getMovies();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    // Calculate stats
    const totalMovies = movies.length;
    const totalNominations = movies.reduce((sum, movie) => sum + movie.oscar_nominations, 0);
    const totalWins = movies.reduce((sum, movie) => sum + movie.oscar_winning, 0);

    return (
        <div className="dashboard-overview">
            <StatsCard title="Total Movies" value={totalMovies} />
            <StatsCard title="Oscar Nominations" value={totalNominations} />
            <StatsCard title="Oscar Wins" value={totalWins} />
        </div>
    );
};

export default DashboardOverview;
