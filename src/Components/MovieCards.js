import React from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import Card from "./Card";
import Header from "./Header";
import Details from "./Details";
import { Button } from "@material-ui/core";

export default class MovieCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: "",
      details: false,
      response : false,
    };
  }

  async componentDidMount() {
    // const headers = {
    //   "x-rapidapi-key": "35185625ffmshae485834fdadb9ap1948bajsn1bbdee7db0ae",
    //   "x-rapidapi-host": "movies-tvshows-data-imdb.p.rapidapi.com",
    //   useQueryString: "true",
    // };
    // let response = await axios
    //   .get(
    //     "https://movies-tvshows-data-imdb.p.rapidapi.com/?type=get-trending-movies&page=1",
    //     headers
    //   )
    //   .then((res) => {
    //     // console.log(res.data);
    //     return res.data
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    //   if(typeof(response) !== undefined){
    //     console.log(response)
    //   }

   
  }

  getResult = () => {

    const query = this.state.search;
    console.log(query)
    axios
      .get("https://www.omdbapi.com/?apikey=c705803f&s=" + query, {
        headers: {},
      })
      .then((res) => {
        console.log(res.data);
        if(res.data['Response'] === false){
          this.setState({movies : false})
        }
        console.log(typeof res.data);
        this.setState({ movies: res.data["Search"] });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  searchMovie = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
   
    const movies = this.state.movies
    return (
     <>
     
     <Header />
     <br></br>
      <div className="mainDiv">
        <input
          style={{
            fontSize: 24,
            width: "90%",
            paddingTop: 8,
            marginLeft: "5%",
            marginRight: "5%",
            paddingBottom: 8,
            paddingLeft: 16,
            borderRadius : 15,
          }}
          placeholder="Search Your favourite movie"
          onChange={this.searchMovie}
          value={this.state.search}
        ></input>

        <Button
          variant="contained"
          color="secondary"
          style={{ width: 150 ,marginTop :8}}
          onClick={this.getResult}
        >
          Search
        </Button>

        <Grid item lg={12} container spacing={2} style={{ paddingLeft: 8 }}>         


          {typeof(movies) === 'object'? <>{this.state.movies.map((movie, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>    
              <Card movie={movie} />
            </Grid>
          ))}</> :<><h1>Data not found please try to search another movie</h1></> }
          
        </Grid>
      </div>
      </>
    );
  }
}
