"use strict";
// TODO: Handle form submission
// Capture the values for each input
// add them to the #movie-container

$("form").on("submit", function (evt) {
  const $formInput = $("input");
  const $movieTitle = $formInput.eq(0).val();
  const $movieRating = $formInput.eq(1).val();

  $("#movie-container").append("<div>").append(`Title: ${$movieTitle}, Rating: ${$movieRating}`);
  evt.preventDefault();
});
//TODO:
// add a button to each movie entry that removes it from the DOM

// TODO: Handle button click that removes movie entry