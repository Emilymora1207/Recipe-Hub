var choosingOptionsPage = document.querySelector('.choosingOptions');
var cuisineTypeEl = document.querySelector('.cuisineType');
var dietEl = document.querySelector('.diet');
var dishTypeEl = document.querySelector('.dishType');
var checkBoxesEl = document.querySelector('.checkBoxes');
var viewSuggestionsBtn = document.querySelector('.submit');
var suggestionsPageEl = document.querySelector('.suggestionsPage');
var demoEl = document.querySelector('.demo');
var suggestionsListEl = document.querySelector('.suggestionsList');
var favoriteMealListEl = document.querySelector('.favoriteMealList');

var suggestionsUrl;
var cuisineType;
var diet;
var dishType;
var mealtime = []

//starts the function when the submit button is pressed
viewSuggestionsBtn.addEventListener('click', chooseSearchParameters);

//looks for any parameters to add to the api call 
function chooseSearchParameters(event) {
  event.preventDefault();
  var cuisineType = cuisineTypeEl.value;
  var diet = dietEl.value;
  var dishType = dishTypeEl.value;

  // if (!cuisineType&&!diet&&!dishType) {
  //   return
  // } else {
    console.log(cuisineType+diet+dishType);
    getSuggestions(cuisineType, diet, dishType);
  // }
  // if (diet){
  //   console.log(diet);
  //   getSuggestions(diet);
  // }
  // if (dishType) {
  //   console.log(dishType);
  //   getSuggestions(dishType);
  // }
};


function getSuggestions(cuisineType, diet, dishType) {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '9c99646218msh9378014e04a0a25p1f2a3ajsn81783a87a42a',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  
  var suggestionsUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?cuisine='+cuisineType+'&diet='+diet+'&intolerances=gluten&type='+dishType+'&instructionsRequired=true&sort=random&offset=0&number=5&limitLicense=false&ranking=2'

  fetch(suggestionsUrl, options).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        console.log(response);
      displaySuggestions(data);
        // demoEl.setAttribute('href', data.hits.recipe.image);
      });
    } 
  });

  };

function displaySuggestions(response) {
choosingOptionsPage.style.display="block";
suggestionsPageEl.style.display='flex';
  for (i=0; i<response.results.length; i++){
  // for(i=0; i<results.lenght; i++){
var suggestionsitemsEl = document.createElement('li');
suggestionsListEl.appendChild(suggestionsitemsEl);
suggestionsListEl.setAttribute('class', 'col-4');
var titleEl = document.createElement('h2');
titleEl.textContent= response.results[i].title;
suggestionsitemsEl.appendChild(titleEl);
var imgEl = document.createElement('img');
imgEl.setAttribute('src', response.results[i].image);
suggestionsitemsEl.appendChild(imgEl);
var addBtn = document.createElement('button');
addBtn.textContent="+"
suggestionsitemsEl.appendChild(addBtn);
addBtn.setAttribute("id", response.results[i].title);
  }
}

// suggestionsListEl.addEventListener('click', function(event) {
//  mealTime = [mealtime + event.target.id];
//  if(mealTime){
//  localStorage.setItem('favoriteMeals', JSON.stringify(mealtime));
//  }
//  console.log(mealTime);
//  console.log(event);

// })


// function getFavsFromStorage() {
// var SetFavoriteMeals = JSON.parse(localStorage.getItem('favoriteMeals'))

// for(j=0; j<SetFavoriteMeals.length; j++){
//   var favoritesList = document.createElement('li');
//   favoritesList.textContent=SetFavoriteMeals[i];
//   favoriteMealListEl.appendChild(favoritesList)
// }
// }




// function tryagain(){
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '9c99646218msh9378014e04a0a25p1f2a3ajsn81783a87a42a',
// 		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
// 	}
// };

// var suggestionsUrl = fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?cuisine=italian&diet=vegetarian&intolerances=gluten&equipment=pan&includeIngredients=tomato%2Ccheese&excludeIngredients=eggs&type=main%20course&instructionsRequired=true&offset=0&number=10&limitLicense=false&ranking=2', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));

// // displaySuggestions(response);
// }
// tryagain();

