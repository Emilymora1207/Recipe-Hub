var result = document.querySelector("#result");
var searchBtn = document.querySelector("#search-btn");
var recipe = document.querySelector(".recipe");
var ingredList = document.querySelector(".ingredients");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("alertP").textContent = "";

  var userInput = document.querySelector("#user-input").value;

  var modifiedInput = userInput.replaceAll("%20");

  console.log(userInput, modifiedInput);
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + modifiedInput)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      displayRecipe(response, userInput);
    });
});
function displayRecipe(response, userInput) {
  ingredList.innerHTML = "ingredients";

  if (response.meals < 1) {
    document.getElementById(
      "alertP"
    ).textContent = `Sorry, we cannot find a recipe with ${userInput} !`;
    return;
  }
  for (var i = 0; i < 1; i++) {
    var myMeal = response.meals[i];
    var recipeItem = document.createElement("div");
    ingredList.appendChild(recipeItem);
    var itemTitle = document.getElementById("title");
    itemTitle.textContent = myMeal.strMeal;
    var itemImgl = document.getElementById("photo");
    var itemImg = document.createElement("img");
    itemImg.setAttribute("src", myMeal.strMealThumb);
    // recipeItem.appendChild(itemTitle);

    itemImgl.appendChild(itemImg);
    var listList = document.createElement("ul");

    recipeItem.appendChild(listList);
    for (var l = 1; l < 20; l++) {
      if (myMeal["strIngredient" + l] === "") {
        break;
      }
      var ingridMeasure = document.createElement("li");
      listList.appendChild(ingridMeasure);
      ingridMeasure.textContent =
        myMeal["strIngredient" + l] + ":" + myMeal["strMeasure" + l];
    }
    var instructionsItem = document.getElementById("direction");
    // recipeItem.appendChild(instructionsItem);
    instructionsItem.textContent = myMeal.strInstructions;
  }
}
