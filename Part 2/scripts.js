"use strict";

const $deleteBtn = $('<button class="delete-btn">Delete</button>');

$("form").on("submit", function (evt) {
  const $formInput = $("input");
  const $movieTitle = $formInput.eq(0).val();
  const $movieRating = $formInput.eq(1).val();

  // TODO: Refactor to separate ratings from titles
  const movie = $("<div>", { text: `${$movieTitle} ${$movieRating}` }).addClass('movie');
  $("#movie-container").append(movie);
  $('.movie').append($deleteBtn);
  evt.preventDefault();
});

$('#movie-container').on('click', '.movie', removeButton);

/** Ignores what we did above and just finds a way to remove the right div */
function removeButton(evt) {
  $(evt.target).parent().remove(); //FIXME: i hate this
}