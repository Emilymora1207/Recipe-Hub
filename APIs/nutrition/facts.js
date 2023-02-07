// const f = document.getElementById('form');
//       const q = document.getElementById('query');
//       const google = 'https://www.google.com/search?q=site%3A+';
//       const site = 'pagedart.com';

//       function submitted(event) {
//         event.preventDefault();
//         const url = google + site + '+' + q.value;
//         const win = window.open(url, '_blank');
//         win.focus();
//       }

//       f.addEventListener('submit', submitted);

var foodFormEl = document.querySelector("#food-form");
var foodInput = document.getElementById("food");
var languageButtonsEl = document.querySelector("#language-buttons");
var nameInputEl = document.querySelector("#food");
var foodContainerEl = document.querySelector("#food-container");
var foodSearchTerm = document.querySelector("#food-search-term");

var formSubmitHandler = function (event) {
  event.preventDefault();

  var food = nameInputEl.value.trim();

  if (food) {
    getNutritionFacts(food);

    foodContainerEl.textContent = "";
    nameInputEl.value = "";
  } else {
    alert("Please enter a food or ingredient");
  }
};

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeatured(language);

    foodContainerEl.textContent = "";
  }
};

var getNutritionFacts = function (food) {
  var apiUrl = "https://trackapi.nutritionix.com/v2/natural/nutrients";

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-id": "d85eee67",
      "x-app-key": "d4fc6579c8e16471db80e37e19e287c9",
      "x-remote-user-id": "0",
    },
    body: JSON.stringify({
      query: foodInput.value,
      timezone: "US/Eastern",
    }),
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayFood(data, food);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Nutritionix");
    });
};

var getFeaturedFood = function (language) {
  var apiUrl =
  "https://trackapi.nutritionix.com/v2/natural/nutrients" +
    language +
    "";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayFood(data.items, language);
      });
    } else {
      alert("Error: " + response.statusText);
    }
  });
};

var displayFood = function (data, searchTerm) {
  console.log (data)
  var food = data.foods;
  if (food.length === 0) {
    foodContainerEl.textContent = "No nutrition facts found.";
    return;
  }



  foodSearchTerm.textContent = searchTerm;
  console.log('food lenght: ' , food.length);
  for (var i = 0; i < food.length; i++) {
    var foodName =  food[i].food_name;
    console.log("i: ", i)

    var foodEl = document.createElement("ul");
    foodEl.classList = "list-item flex-row justify-space-between align-center";

    var titleEl = document.createElement("li");
    titleEl.textContent = foodName;

    foodEl.appendChild(titleEl);

    var statusEl = document.createElement("li");
    statusEl.classList = "flex-row align-center";

    // if (food[i].open_items_count > 0) {
    //   statusEl.innerHTML =
    //     "<i class='fas fa-times status-icon icon-danger'></i>" +
    //     food[i].open_items_count +
    //     " issue(s)";
    // } else {
    //   statusEl.innerHTML =
    //     "<i class='fas fa-check-square status-icon icon-success'></i>";
    // }

//creates teh break elemnet
    

    // statusEl.textContent="sodium: " + food[i].nf_sodium
    
    // foodEl.appendChild(statusEl);

    
    var carloriesEl = document.createElement('li');
    carloriesEl.textContent = "calories: " + food[i].nf_calories;    
    foodEl.appendChild(carloriesEl);

    var cholesterolEl = document.createElement('li');
    cholesterolEl.textContent = "cholesterol: " + food[i].nf_cholesterol;
    foodEl.appendChild(cholesterolEl);

    var dietary_fiberEl = document.createElement('li');
    dietary_fiberEl.textContent = "dietary_fiber: " + food[i].nf_dietary_fiber;
    foodEl.appendChild(dietary_fiberEl);

    var potassiumEl = document.createElement('li');
    potassiumEl.textContent = "potassium: " + food[i].nf_potassium;
    foodEl.appendChild(potassiumEl);

    var proteinEl = document.createElement('li');
    proteinEl.textContent = "protein: " + food[i].nf_protein;
    foodEl.appendChild(proteinEl);

    var saturated_fatEl = document.createElement('li');
    saturated_fatEl.textContent = "saturated_fat: " + food[i].nf_saturated_fat;
    foodEl.appendChild(saturated_fatEl);

    var sodiumEl = document.createElement('li');
    sodiumEl.textContent = "sodium: " + food[i].nf_sodium;
    foodEl.appendChild(sodiumEl);

    var sugarsEl = document.createElement('li');
    sugarsEl.textContent = "sugars: " + food[i].nf_sugars;
    foodEl.appendChild(sugarsEl);

    var carbohydrateEl = document.createElement('li');
    carbohydrateEl.textContent = "carbohydrate: " + food[i].nf_total_carbohydrate;
    foodEl.appendChild(carbohydrateEl);

    var total_fatEl = document.createElement('li');
    total_fatEl.textContent = "total_fat: " + food[i].nf_total_fat;
    foodEl.appendChild(total_fatEl);

    var qtyEl = document.createElement('li');
    qtyEl.textContent = "qty: " + food[i].serving_qty;
    foodEl.appendChild(qtyEl);

    var unitEl = document.createElement('li');
    unitEl.textContent = "serving_unit: " + food[i].serving_unit;
    foodEl.appendChild(unitEl);

    var weight_gramsEl = document.createElement('li');
    weight_gramsEl.textContent = "serving_weight_grams: " + food[i].serving_weight_grams;
    foodEl.appendChild(weight_gramsEl);

    var itemEl = document.createElement('li');
    itemEl.textContent = "item: " + food[i].tags.item;
    foodEl.appendChild(itemEl);

    var highresEl = document.createElement('img');
    highresEl.setAttribute("src",food[i].photo.highres);
    document.getElementById("photo").appendChild(highresEl);










    console.log("food element: ", foodEl);

    foodContainerEl.appendChild(foodEl);
  }
};

foodFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);
