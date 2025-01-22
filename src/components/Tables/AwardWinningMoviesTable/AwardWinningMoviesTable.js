import React, { useEffect, useState } from "react";
import { Table, Form, Row, Col, Pagination } from "react-bootstrap";
import { fetchMoviesData } from "../../../utils/fetchData";
import "./AwardWinningMoviesTable.css";

const AwardWinningMoviesTable = () => {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("oscarsWon");
    const [sortOrder, setSortOrder] = useState("desc");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const getData = async () => {
        try {
            const data = await fetchMoviesData();
            const moviesWithAwards = data.map((movie) => {
                const match = movie.awards.match(/Won (\d+) Oscars/);
                return {
                    ...movie,
                    oscarsWon: match ? parseInt(match[1], 10) : 0,
                };
            });
            setMovies(moviesWithAwards);
            setFilteredMovies(moviesWithAwards);
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
        filterMovies(value);
        setCurrentPage(1); 
    };

    const filterMovies = (search) => {
        let updatedMovies = movies;

        if (search) {
            updatedMovies = updatedMovies.filter((movie) =>
                movie.title.toLowerCase().includes(search)
            );
        }

        setFilteredMovies(updatedMovies);
    };

    const handleSort = (key) => {
        const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
        setSortKey(key);
        setSortOrder(order);

        const sortedMovies = [...filteredMovies].sort((a, b) => {
            if (key === "oscarsWon") {
                return order === "asc" ? a[key] - b[key] : b[key] - a[key];
            } else {
                return order === "asc"
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
        });

        setFilteredMovies(sortedMovies);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredMovies.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const currentRows = filteredMovies.slice(startIndex, startIndex + rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="award-winning-movies-table">
            <h5 className="table-title">Award-Winning Movies</h5>
            <Row className="mb-4">
                <Col md={6}>
                    <Form.Control
                        type="text"
                        placeholder="Search by Title"
                        value={searchTerm}
                        onChange={handleSearch}
                        className="brand-input"
                    />
                </Col>
            </Row>
            {filteredMovies.length > 0 ? (
                <>
                    <Table striped bordered hover responsive className="brand-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th role="button" onClick={() => handleSort("title")}>
                                    Title
                                </th>
                                <th
                                    role="button"
                                    onClick={() => handleSort("oscarsWon")}
                                >
                                    Oscars Won
                                </th>
                                <th>Awards/Nominations Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.map((movie, index) => (
                                <tr key={movie.id}>
                                    <td>{startIndex + index + 1}</td>
                                    <td>{movie.title}</td>
                                    <td>{movie.oscarsWon}</td>
                                    <td>{movie.awards}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="align-table-pagination mt-2">
                        <small className="text-white">
                            Showing {startIndex + 1} to{" "}
                            {Math.min(
                                startIndex + rowsPerPage,
                                filteredMovies.length
                            )}{" "}
                            of {filteredMovies.length} results
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
                <p className="text-center text-white">No movies found.</p>
            )}
        </div>
    );
};

export default AwardWinningMoviesTable;
