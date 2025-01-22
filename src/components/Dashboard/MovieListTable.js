
import React from 'react';

/**
 * MovieListTable Component
 * @param {Object[]} props.movies - Array of movie objects
 */
const MovieListTable = ({ movies }) => {
    return (
        <table className="movie-list-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Genre</th>
                    <th>IMDB Rating</th>
                    <th>Oscar Nominations</th>
                    <th>Oscar Wins</th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie, index) => (
                    <tr key={index}>
                        <td>{movie.title}</td>
                        <td>{movie.year}</td>
                        <td>{movie.genre.join(', ')}</td>
                        <td>{movie.imdb_rating}</td>
                        <td>{movie.oscar_nominations}</td>
                        <td>{movie.oscar_winning}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default MovieListTable;
