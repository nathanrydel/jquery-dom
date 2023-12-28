"use strict";

let currentMovieId = 0;
let moviesList = [];

function addMovie(evt) {
  evt.preventDefault();

  let movieTitle = $("#movie-title").val();
  let movieRating = $("#movie-rating").val();

  let movieData = { movieTitle, movieRating, currentMovieId };
  // create the necessary HTML to append movie to DOM, use a generator function

  currentMovieId++;
  moviesList.push(movieData);

  $("#movie-container").append(); // Add generated HTML to DOM
  $("#new-movie-form").trigger("reset"); // reset form after submission

}

$("#new-movie-form").on("submit", addMovie)

