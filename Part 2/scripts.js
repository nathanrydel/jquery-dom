"use strict";

let currentMovieId = 0;
let moviesList = [];

/**
 * Handle adding a new movie to the movie table
 *
 * @param {SubmitEvent Object} evt - Data from new movie form
 */

function addMovie(evt) {
    evt.preventDefault();

    let movieTitle = $("#movie-title").val();
    let movieRating = $("#movie-rating").val();

    let movieData = { movieTitle, movieRating, currentMovieId };
    // create the necessary HTML to append movie to DOM, using a generator func
    const movieHTML = createMovieDataHTML(movieData);

    currentMovieId++;
    moviesList.push(movieData);

    $("#movie-container").append(movieHTML); // Add generated HTML to DOM
    $("#new-movie-form").trigger("reset"); // reset form after submission

}

$("#new-movie-form").on("submit", addMovie);


/**
 * Takes a form submission event object with title, rating, returns str of HTML
 * @param {SubmitEvent Object} evt - Data from new movie form
 * @returns {string} - HTML to add a new movie to the table as a str
 */

function createMovieDataHTML(data) {
    return `
        <tr>
            <td>${data.title}</td>
            <td>${data.rating}</td>
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