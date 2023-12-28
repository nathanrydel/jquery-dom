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
 * Handle sorting and updating the table when the sort arrow is clicked, toggle
 * the direction of the arrow based on current state
 *
 * @param {Event} evt - Event object created when the sort arrow is clicked
 */

function toggleAndSortMovies(evt) {
    console.debug("toggleAndSortMovies ran", moviesList);
    // figure out what direction we are sorting and the key to sort by
    let direction = $(evt.target).hasClass("bi-sort-down") ? "down" : "up";
    let keyToSortBy = $(evt.target).attr("id");
    console.log(keyToSortBy);
    let sortedMovies = sortBy(moviesList, keyToSortBy, direction);

    // empty the table
    $("#movie-table-body").empty();

    // loop over our object of sortedMovies and append a new row
    for (let movie of sortedMovies) {
        const movieHTML = createMovieDataHTML(movie);
        $("#movie-table-body").append(movieHTML);
    }

    // toggle the arrow
    $(evt.target).toggleClass("bi-sort-down");
    $(evt.target).toggleClass("bi-sort-up");
}

$(".bi").on("click", toggleAndSortMovies);

/**
 * Accepts array, keyToSortBy, and a direction to handle the logic of sorting
 *  moviesList
 *
 * @param {string[]} array - An array of HTML strings
 * @param {string} keyToSortBy - What to sort by, either title or rating
 * @param {string} direction - Sort array down(ascending) or up(descending) order
 * @returns {number} - A numerical explanation of direction to sort (-1, 0, 1)
 */

function sortBy(array, keyToSortBy, direction) {
    console.debug("sortBy ran", moviesList);

    // const newArray = array.slice();

    return array.sort(function (a, b) {
        // since rating is a number, we have to convert these strings to numbers
        if (keyToSortBy === "movieRating") {
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
        }
        if (a[keyToSortBy] > b[keyToSortBy]) {
            return direction === "up" ? 1 : -1;
        } else if (b[keyToSortBy] > a[keyToSortBy]) {
            return direction === "up" ? -1 : 1;
        }
        return 0;
    });
}

/**
 * Takes a form submission event object with title, rating, returns str of HTML
 * @param {SubmitEvent Object} evt - Data from new movie form
 * @returns {string} - HTML to add a new movie to the table as a str
 */

function createMovieDataHTML(data) {
    console.debug("createMovieDataHTML ran");
    return `
        <tr>
            <td class="ps-4 pt-3">${data.movieTitle}</td>
            <td class="pt-3">${data.movieRating}</td>
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