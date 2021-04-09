import React from "react";
import { Button } from "@material-ui/core";
import "./Card.css";
import { Redirect } from "react-router";

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: props.movie,
      redirect: false,
    };
  }

  details = () => {
    this.setState({ redirect: true });
  };

  render() {
    const movie = this.state.movie;

    if (this.state.redirect === true) {
      // Poster: "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg";
      // Title: "Batman Begins";
      // Type: "movie";
      // Year: "2005";
      // imdbID: "tt0372784";
      localStorage.setItem('Poster',movie['Poster'])
      localStorage.setItem('Title',movie['Title'])
      localStorage.setItem('imdbID',movie['imdbID'])
     

      return <Redirect Movie={movie} to="./Details"></Redirect>;
    }

    return (
      <div className="card">
        <img className="cardImg" src={movie["Poster"]} alt="movie Poster" />

        <p class="text">{movie["Title"]}</p>
        <Button
          variant="contained"
          color="secondary"
          style={{ width: 250 }}
          onClick={this.details}
        >
          Details
        </Button>
      </div>
    );
  }
}
