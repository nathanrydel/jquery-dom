"use strict";

const $button = $('<button class="delete-btn">Delete</button>');

$("form").on("submit", function (evt) {
  const $formInput = $("input");
  const $movieTitle = $formInput.eq(0).val();
  const $movieRating = $formInput.eq(1).val();

  const $movie = $("<div>").addClass('movie');
  $movie.append("<span>" + $movieTitle + "</span>");
  $movie.append("<span>" + $movieRating + "</span>");
  $movie.append($button.clone());
  $("#movie-container").append($movie);
  evt.preventDefault();
});

$('#movie-container').on('click', '.delete-btn', deleteMovieEntry);

/** Ignores what we did above and just finds a way to remove the right div */
function deleteMovieEntry(evt) {
  $(evt.target).closest(".movie").remove();
}