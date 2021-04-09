import React from "react";
import axios from "axios";
import Header from "./Header";
import "./Details.css";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
} from "react-share";
import {
  FacebookIcon,
  InstapaperIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

export default class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataNotFound: false,
      ytUrl: "",
      title: "",
      poster: "",
      imdbID: "",
      movieDetails: {},
    };
  }

  componentDidMount() {
    const poster = localStorage.getItem("Poster");
    const title = localStorage.getItem("Title");
    const imdbID = localStorage.getItem("imdbID");

    console.log(imdbID);

    if (!poster && !title && !imdbID) {
      this.setState({ dataNotFound: true });
    } else {
      this.setState({ title: title });
      this.setState({ poster: poster });
      this.setState({ imdbID: imdbID });

      const query = title + "official trailer";
      axios
        .get(
          "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyD7ak83iO0UP1JNOw8o__GTkpdpWoXbSPE&q=" +
            query
        )
        .then((res) => {
          const trailerUrl =
            "https://www.youtube.com/embed/" +
            res.data["items"][0]["id"]["videoId"];
          console.log(trailerUrl);
          this.setState({ ytUrl: trailerUrl });
        })
        .catch((error) => {});

      const headers = {
        "x-rapidapi-key": "35185625ffmshae485834fdadb9ap1948bajsn1bbdee7db0ae",
        "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
        useQueryString: "true",
      };
      axios
        .get(
          "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-movie-details&imdb=tt0372784",
          headers
        )
        .then((res) => {
          console.log(res.data);
          this.setState({ movieDetails: res.data });
        })
        .catch((error) => {});
    }
  }

  render() {
    if (this.state.dataNotFound) {
      return <h1>Please select movie from search page to see the details</h1>;
    }
    return (
      <>
        <Header />
        <br></br>
        <div classname="container">
          <div className="detailCard">
            <img
              src={this.state.poster}
              style={{ borderRadius: 15, border: "5px solid #555" }}
              alt="movie"
            />
            <div className="innerDiv">
              <p style={{ fontSize: "1.5rem", fontStyle: "bold" }}>
                Movie name :-{this.state.title}
              </p>
              <p style={{ fontSize: "1rem" }}>
                Description :- {this.state.movieDetails["description"]}
              </p>
              <p>Ratings :- {this.state.movieDetails["imdb_rating"]}</p>
              <p>Year :- {this.state.movieDetails["year"]}</p>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <p style={{ fontSize: "2rem" }}>Movie trailer</p>
          <iframe
            className="video"
            title={this.state.title}
            src={this.state.ytUrl}
          ></iframe>

          <p style={{ fontSize: "2rem" }}>Share this trailer...</p>
          <div className="footer">
            <FacebookShareButton
              url={this.state.ytUrl}
              quote={this.state.movieDetails["Title"]}
            >
              <FacebookIcon size={36} />
            </FacebookShareButton>

            <TwitterShareButton
              url={this.state.ytUrl}
              quote={this.state.movieDetails["Title"]}
            >
              <TwitterIcon size={36} />
            </TwitterShareButton>

            <InstapaperShareButton
              url={this.state.ytUrl}
              quote={this.state.movieDetails["Title"]}
            >
              <InstapaperIcon size={36} />
            </InstapaperShareButton>

            <WhatsappShareButton
              url={this.state.ytUrl}
              quote={this.state.movieDetails["Title"]}
            >
              <WhatsappIcon size={36} />
            </WhatsappShareButton>
          </div>
        </div>
      </>
    );
  }
}
