import React, { useEffect, useState } from "react";
import { Table, Form, Row, Col, Pagination, Button } from "react-bootstrap";
import { fetchMoviesData } from "../../../utils/fetchData";
import "./TopRatedMovieTable.css";

const TopRatedMovieTable = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [selectedDirector, setSelectedDirector] = useState("All");
    const [sortKey, setSortKey] = useState("rating");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10; 

    const getData = async () => {
        try {
            const data = await fetchMoviesData();
            setMovies(data);
            setFilteredMovies(data);
        } catch (err) {
            console.error("Error fetching movies:", err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        filterMovies(value, selectedGenre, selectedDirector);
        setCurrentPage(1); 
    };

    const handleGenreChange = (e) => {
        const value = e.target.value;
        setSelectedGenre(value);
        filterMovies(searchTerm, value, selectedDirector);
        setCurrentPage(1); 
    };

    const handleDirectorChange = (e) => {
        const value = e.target.value;
        setSelectedDirector(value);
        filterMovies(searchTerm, selectedGenre, value);
        setCurrentPage(1); 
    };

    const filterMovies = (search, genre, director) => {
        let updatedMovies = movies;

        if (search) {
            updatedMovies = updatedMovies.filter((movie) =>
                movie.title.toLowerCase().includes(search)
            );
        }

        if (genre !== "All") {
            updatedMovies = updatedMovies.filter((movie) =>
                movie.genre.includes(genre)
            );
        }

        if (director !== "All") {
            updatedMovies = updatedMovies.filter(
                (movie) => movie.director === director
            );
        }

        setFilteredMovies(updatedMovies);
    };

    const handleSort = (key) => {
        const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
        setSortKey(key);
        setSortOrder(order);

        const sortedMovies = [...filteredMovies].sort((a, b) => {
            if (key === "rating" || key === "year") {
                return order === "asc" ? a[key] - b[key] : b[key] - a[key];
            } else {
                return order === "asc"
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
        });

        setFilteredMovies(sortedMovies);
    };

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm("");
        setSelectedGenre("All");
        setSelectedDirector("All");
        setFilteredMovies(movies); 
        setCurrentPage(1);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredMovies.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = filteredMovies.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Getting unique genres and directors for filters
    const uniqueGenres = Array.from(
        new Set(movies.flatMap((movie) => movie.genre))
    );
    const uniqueDirectors = Array.from(
        new Set(movies.map((movie) => movie.director))
    );

    return (
        <div className="top-rated-movie-table">
            <h5 className="table-title">Top Rated Movies</h5>
            <Row className="mb-4 align-items-center">
                <Col md={3}>
                    <Form.Control
                        type="text"
                        placeholder="Search by Title"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="brand-input mb-2"
                    />
                </Col>
                <Col md={3}>
                    <Form.Select value={selectedGenre} onChange={handleGenreChange} className="brand-input mb-2">
                        <option value="All">All Genres</option>
                        {uniqueGenres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Form.Select value={selectedDirector} onChange={handleDirectorChange} className="brand-input mb-2">
                        <option value="All">All Directors</option>
                        {uniqueDirectors.map((director) => (
                            <option key={director} value={director}>
                                {director}
                            </option>
                        ))}
                    </Form.Select>
                </Col>
                <Col md={3}>
                    <Button variant="secondary" onClick={clearFilters} className="mb-3 float-end brand-red-btn">
                        Clear Filters
                    </Button>
                </Col>
            </Row>

            {filteredMovies.length > 0 ? (
                <>
                    <Table striped bordered hover responsive className="brand-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th onClick={() => handleSort("title")}>Title</th>
                                <th onClick={() => handleSort("rating")}>IMDb Rating</th>
                                <th onClick={() => handleSort("year")}>Year</th>
                                <th>Genre</th>
                                <th onClick={() => handleSort("director")}>Director</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((movie, index) => (
                                <tr key={movie.id}>
                                    <td>{startIndex + index + 1}</td>
                                    <td>{movie.title}</td>
                                    <td>{movie.rating}</td>
                                    <td>{movie.year}</td>
                                    <td>{movie.genre.join(", ")}</td>
                                    <td>{movie.director}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <div className="align-table-pagination mt-2">
                        <small className="text-white">
                            Showing {startIndex + 1} to{" "}
                            {Math.min(startIndex + rowsPerPage, filteredMovies.length)} of{" "}
                            {filteredMovies.length} results
                        </small>
                        <Pagination>
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </div>
                </>
            ) : (
                <p className="text-white text-center">No results found.</p>
            )}
        </div>
    );
};

export default TopRatedMovieTable;


