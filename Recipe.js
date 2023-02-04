var result = document.querySelector("#result");
var searchBtn = document.querySelector("#search-btn");
var recipe = document.querySelector(".recipe");
var ingredList = document.querySelector(".ingredients");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var userInput = document.querySelector("#user-input").value;

  var modifiedInput = userInput.replaceAll("%20");

  console.log(userInput, modifiedInput);
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + modifiedInput)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      displayRecipe(response);
    });
});
function displayRecipe(response) {
  for (var k = 0; k < response.meals.length; k++) {
    var myMeal = response.meals[k];
    var recipeItem = document.createElement("li");
    ingredList.appendChild(recipeItem);
    var itemTitle = document.createElement("h2");
    itemTitle.textContent = myMeal.strMeal;
    var itemImg = document.createElement("img");
    itemImg.setAttribute("src", myMeal.strMealThumb);
    recipeItem.appendChild(itemTitle);

    recipeItem.appendChild(itemImg);
    var listList = document.createElement("ul");

    recipeItem.appendChild(listList);
    for (var l = 0; l < 20; l++) {
      if (myMeal["strIngredient" + l] === "") {
        break;
      }
      var ingridMeasure = document.createElement("li");
      listList.appendChild(ingridMeasure);
      ingridMeasure.textContent =
        myMeal["strIngredient" + l] + ":" + myMeal["strMeasure" + l];
    }
    var instructionsItem = document.createElement("p");
    recipeItem.appendChild(instructionsItem);
    instructionsItem.textContent = myMeal.strInstructions;
  }
}
