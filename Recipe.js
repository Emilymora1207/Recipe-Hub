// var url = "https://www.themealdb.com/api/json/v1/1/search.php?f=";

// var userInput = document.getElementById("user-input").value;
// fetch(url + "a")
//   .then((Response) => Response.json())
//   .then((data) => {
//     var myMeal = data.meals[0];
//     console.log(myMeal);
//     console.log(Response);
//     getRecipe(myMeal);
//   });
// function getRecipe(myMeal) {
//   for (var i = 0; i < 20; i++) {
//     var ingredientsItem = document.createElement("li");
//     ingredientsItem.textContent = myMeal.strIngredient[i];
//     console.log(myMeal.strIngredient[i]);
//     ing.appendChild(ingredientsItem);
//   }
// }
var result = document.querySelector("#result");
var searchBtn = document.querySelector("#search-btn");
var recipe = document.querySelector(".recipe");
var ingredItem = document.querySelector(".ingredients");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "208fb9c73emsh8b7abaaea8ec0ecp1e4d8ajsn1a0b17075460",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var userInput = document.querySelector("#user-input").value;
  console.log(userInput);
  fetch(
    "https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      for (var i = 0; i < response.results.length; i++) {
        var myMeal = response.results[i];
        var ingredientsItem = document.createElement("li");
        ingredientsItem.textContent = myMeal.display;
        console.log(myMeal.display);
        ingredItem.appendChild(ingredientsItem);
      }
    });
});
