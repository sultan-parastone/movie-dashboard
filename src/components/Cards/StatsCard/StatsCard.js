import React from "react";
import { Card } from "react-bootstrap";
import { Film, Award, DollarSign, Star, Video, User, Layers } from "lucide-react";
import "./StatsCard.css";

const StatsCard = ({ title, data }) => {
    let IconComponent;
    let value = "N/A";
    let subtitle = ""; 

    // Stats Card Title Mapping & Required Calculation
    switch (title) {
        case "Most Oscar-Winning Movie":
            IconComponent = Award;
            const maxAwards = Math.max(
                ...data.map((movie) => {
                    const match = movie.awards.match(/Won (\d+) Oscars/);
                    return match ? parseInt(match[1], 10) : 0;
                })
            );
            const mostAwardedMovie = data.find((movie) => {
                const match = movie.awards.match(/Won (\d+) Oscars/);
                return match && parseInt(match[1], 10) === maxAwards;
            });
            value = mostAwardedMovie?.title || "N/A";
            subtitle = `(${maxAwards} Oscars)`;
            break;

        case "Top Director":
            IconComponent = User;
            const directorCount = data.reduce((acc, movie) => {
                const directors = movie.director.split(",");
                directors.forEach((dir) => {
                    acc[dir.trim()] = (acc[dir.trim()] || 0) + 1;
                });
                return acc;
            }, {});
            const topDirector = Object.keys(directorCount).reduce((a, b) =>
                directorCount[a] > directorCount[b] ? a : b
            );
            value = topDirector || "N/A";
            subtitle = `(${directorCount[topDirector]} Movies)`;
            break;

        case "Top Genre":
            IconComponent = Layers;
            const genreCount = data.reduce((acc, movie) => {
                movie.genre.forEach((g) => {
                    acc[g] = (acc[g] || 0) + 1;
                });
                return acc;
            }, {});
            const topGenre = Object.keys(genreCount).reduce((a, b) =>
                genreCount[a] > genreCount[b] ? a : b
            );
            value = topGenre || "N/A";
            subtitle = "(common in most movies)";
            break;

        case "Total Movies":
            IconComponent = Film;
            value = data.length;
            break;

        case "Total Awards Won":
            IconComponent = Award;
            value = data.reduce((total, movie) => {
                const match = movie.awards.match(/Won (\d+) Oscars/);
                return match ? total + parseInt(match[1], 10) : total;
            }, 0);
            break;

        case "Total Box Office":
            IconComponent = DollarSign;
            value = `$${data
                .reduce((total, movie) => {
                    const match = movie.boxOffice.match(/\$(\d+(\.\d+)?)\s*(million|billion)/i);
                    if (match) {
                        let boxOffice = parseFloat(match[1]);
                        if (match[3].toLowerCase() === "million") boxOffice /= 1000; 
                        total += boxOffice;
                    }
                    return total;
                }, 0)
                .toFixed(1)}B`;
            break;

        case "Top IMDb Rating":
            IconComponent = Star;
            value = Math.max(...data.map((movie) => movie.rating));
            break;


        default:
            IconComponent = Film;
            value = "N/A";
    }

    return (
        <Card className="shadow-sm stats-card">
            <Card.Body className="stats-align-card">
                <div className="stats-details-wrap">
                    <Card.Title className="fs-5">{title}</Card.Title>
                    <Card.Text className="fs-4 fw-bold">{value}</Card.Text>
                    {subtitle && <Card.Text className="fs-6">{subtitle}</Card.Text>}
                </div>
                <div className="stats-icon-wrap">
                    <IconComponent size={36} className="mb-3" />
                </div>
            </Card.Body>
        </Card>
    );
};

export default StatsCard;
