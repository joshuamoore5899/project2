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
  let url = "https://api.spoonacular.com/recipes/findByIngredients?apiKey=1582ec83b96441669036ed721e4fd860&ingredients=" + ingredients + "&number=3&ignorePantry=true";
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
        let url2 = "https://api.spoonacular.com/recipes/" + json[i].id + "/information" + "?apiKey=1582ec83b96441669036ed721e4fd860";
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

function updateResult(info) {
  document.getElementById('result').innerHTML = document.getElementById('result').innerHTML + '<br><br>' + info;
}

document.getElementById('woo').addEventListener('click', onClick);
