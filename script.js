function onClick(e) {
  e.preventDefault();
  // get form values
  let ingredients = document.getElementById('ingredients').value;
  document.getElementById('result').innerHTML = "";
  //let s = document.getElementById('selector');
  //let type = s.options[s.selectedIndex].value;

  // check if number is empty
  if (ingredients === "") {
    ingredients = "milk,sugar,eggs";
  }

  // setup URL
  let url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=3fec4c681dcf48e98b4f851a59cf968b&ingredients=" + ingredients + "&number=3&ignorePantry=true";
  //let url = "http://numbersapi.com/" + number + "/" + type + "?json";
  //let url = "http://numbersapi.com/random/year?json";
  // call API
  fetch(url)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
      console.log(json);
      for (let i = 0; i < json.length; i++) {
        let recipe = "";
        let name = json[i].title;
        //updateResult(json[i].title);
        let url2 = "https://api.spoonacular.com/recipes/" + json[i].id + "/information" + "?apiKey=3fec4c681dcf48e98b4f851a59cf968b";
        fetch(url2)
          .then(function(response) {
            // make sure the request was successful
            if (response.status != 200) {
              return {
                text: "Error calling the Numbers API service: " + response.statusText
              }
            }
            return response.json();
          }).then(function(json) {
            console.log(json);
            recipe += "<a href=" + json.sourceUrl + ">" + name + "</a>";
            //recipe += " " + json.sourceUrl;
            updateResult(recipe);
      });
    }
  });
};

function onClick2(e) {
  e.preventDefault();
  // get form values
  let calories = document.getElementById('calories').value;
  document.getElementById('result2').innerHTML = "";
  //let s = document.getElementById('selector');
  //let type = s.options[s.selectedIndex].value;

  // check if number is empty
  if (calories === "") {
    calories = "2000";
  }

  // setup URL
  let url3 = "https://api.spoonacular.com/mealplanner/generate?apiKey=3fec4c681dcf48e98b4f851a59cf968b&timeFrame=day&targetCalories=" + calories;
  //let url = "http://numbersapi.com/" + number + "/" + type + "?json";
  //let url = "http://numbersapi.com/random/year?json";
  // call API
  fetch(url3)
    .then(function(response) {
      // make sure the request was successful
      if (response.status != 200) {
        return {
          text: "Error calling the Numbers API service: " + response.statusText
        }
      }
      return response.json();
    }).then(function(json) {
      // update DOM with response
        console.log(json);
        for (let i = 0; i < json.meals.length; i++) {
          let plannerOutput = "";
          if (i === 0) {
            plannerOutput = "Breakfast: <a href=" + json.meals[i].sourceUrl + ">" + json.meals[i].title + "</a>";
          }
          if (i === 1) {
            plannerOutput = "Lunch: <a href=" + json.meals[i].sourceUrl + ">" + json.meals[i].title + "</a>";
          }
          if (i === 2) {
            plannerOutput = "Dinner: <a href=" + json.meals[i].sourceUrl + ">" + json.meals[i].title + "</a>";
          }
          updateResult2(plannerOutput);
          console.log(json.meals[i].sourceUrl);
          console.log(json.meals[i].title);
          console.log("Yes");
        }
      });
    };

function updateResult(info) {
  document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + '<br><br>' + info;
}

function updateResult2(info) {
  document.getElementById('result2').innerHTML = document.getElementById('result2').innerHTML + '<br><br>' + info;
}

document.getElementById('woo').addEventListener('click', onClick);

document.getElementById('woo2').addEventListener('click', onClick2);
