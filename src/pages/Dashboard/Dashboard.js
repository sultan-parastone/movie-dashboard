import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { fetchMoviesData } from "../../utils/fetchData";
import StatsCard from "../../components/Cards/StatsCard/StatsCard";
import MovieOscarWinsBarChart from "../../components/Charts/MovieOscarWinsBarChart/MovieOscarWinsBarChart";
import MoviesGenreBarChart from "../../components/Charts/MoviesGenreBarChart/MoviesGenreBarChart";
import BoxOfficeEarningBarChart from "../../components/Charts/BoxOfficeEarningBarChart/BoxOfficeEarningBarChart";
import LanguageDistributionPieChart from "../../components/Charts/LanguageDistributionPieChart/LanguageDistributionPieChart";
import GenrePopularityPieChart from "../../components/Charts/GenrePopularityPieChart/GenrePopularityPieChart";
import IMDbRatingHeatmapChart from "../../components/Charts/IMDbRatingHeatMapChart/IMDbRatingHeatMapChart";
import "./Dashboard.css";
import TopRatedMovieTable from "../../components/Tables/TopRatedMovieTable/TopRatedMovieTable";
import MoviesByRevenueTable from "../../components/Tables/MoviesByRevenueTable/MoviesByRevenueTable";
import AwardWinningMoviesTable from "../../components/Tables/AwardWinningMoviesTable/AwardWinningMoviesTable";


const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchMoviesData();
                setMovies(data);
            } catch (err) {
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard-container">
            <div className="container-fluid">
                <h4 className="dashboard-title">Dashboard</h4>
                <Row className="gy-4">
                    <Col md={6} lg={3}>
                        <StatsCard title="Total Movies" data={movies} />
                    </Col>
                    <Col md={6} lg={3}>
                        <StatsCard title="Total Awards Won" data={movies} />
                    </Col>
                    <Col md={6} lg={3}>
                        <StatsCard title="Total Box Office" data={movies} />
                    </Col>
                    <Col md={6} lg={3}>
                        <StatsCard title="Top IMDb Rating" data={movies} />
                    </Col>
                </Row>

                <Row className="gy-4 mt-2">
                    <Col md={6} lg={4}>
                        <StatsCard title="Most Oscar-Winning Movie" data={movies} />
                    </Col>
                    <Col md={6} lg={4}>
                        <StatsCard title="Top Director" data={movies} />
                    </Col>
                    <Col md={6} lg={4}>
                        <StatsCard title="Top Genre" data={movies} />
                    </Col>
                </Row>

                <Row className="gy-4 mt-2">
                    <Col md={6}>
                        <MovieOscarWinsBarChart />
                    </Col>

                    <Col lg={6}>
                        <MoviesGenreBarChart />
                    </Col>
                </Row>

                

                <Row className="gy-4 mt-2">
                    <Col md={6}>
                        <LanguageDistributionPieChart />
                    </Col>

                    <Col lg={6}>
                        <GenrePopularityPieChart />
                    </Col>
                </Row>

                <Row className="gy-4 mt-2">
                    <Col md={12}>
                        <BoxOfficeEarningBarChart />
                    </Col>
                </Row>

                <Row className="gy-4 mt-2">
                    <Col md={12}>
                        <IMDbRatingHeatmapChart />
                    </Col>
                </Row>

                <Row className="gy-4 mt-2">
                    <Col md={12}>
                        <TopRatedMovieTable />
                    </Col>
                </Row>

                <Row className="gy-4 mt-2">
                    <Col md={12}>
                        <MoviesByRevenueTable />
                    </Col>
                </Row>

                <Row className="gy-4 mt-2">
                    <Col md={12}>
                        <AwardWinningMoviesTable />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Dashboard;
