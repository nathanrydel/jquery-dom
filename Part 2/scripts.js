"use strict";

let currentMovieId = 0;
let moviesList = [];

/**
 * Handle adding a new movie to the movie table
 *
 * @param {SubmitEvent} evt - Data from new movie form
 */

function addMovie(evt) {
    console.debug("addMovie ran");
    evt.preventDefault();

    let movieTitle = $("#movie-title").val();
    let movieRating = $("#movie-rating").val();

    let movieData = { movieTitle, movieRating, currentMovieId };
    // create the necessary HTML to append movie to DOM, using a generator func
    const movieHTML = createMovieDataHTML(movieData);

    currentMovieId++;
    moviesList.push(movieData);

    $("#movie-table-body").append(movieHTML); // Add generated HTML to DOM
    $("#new-movie-form").trigger("reset"); // reset form after submission

}

$("#new-movie-form").on("submit", addMovie);

/**
 * Handle deleting a movie from the table
 *
 * @param {SubmitEvent} evt - A button submit object
 *
 */

function deleteMovie(evt) {
    console.debug("deleteMovie Ran");
    let indexToRemove = moviesList.findIndex(movie => (
        movie.currentMovieId === +$(evt.target).attr("data-delete-id")
    ));

    moviesList.splice(indexToRemove, 1);

    $(evt.target).closest("tr").remove();
}

$("tbody").on("click", ".btn.btn-danger", deleteMovie);

/**
 * Takes a form submission event object with title, rating, returns str of HTML
 * @param {SubmitEvent Object} evt - Data from new movie form
 * @returns {string} - HTML to add a new movie to the table as a str
 */

function createMovieDataHTML(data) {
    console.debug("createMovieDataHTML ran");
    return `
        <tr>
            <td>${data.movieTitle}</td>
            <td>${data.movieRating}</td>
            <td>
                <button
                    class="btn btn-danger"
                    data-delete-id=${data.currentMovieId}>
                    Delete
                </button>
            </td>
        </tr>
    `;
}