var fetchedRecipeDetails = null;

var checkCreations = function(){
    // alert('Creating local data structuures');
    if(localStorage.getItem('Recipes') == null){
        localStorage.setItem('Recipes', JSON.stringify({}));
    }
    if(localStorage.getItem('Indices') == null){
        localStorage.setItem('Indices', JSON.stringify({}));
    }
}

var updateData = function(jsonData){
    checkCreations();
    // debugger
    let indices = JSON.parse(localStorage.getItem('Indices'));
    let indkeys = Object.keys(indices);
    let newIndex = '-1';
    if(indkeys.length != 0){
        newIndex = indkeys.slice(-1)[0];
    }
    newIndex = (parseInt(newIndex)+1).toString();

    let newObj = {};
    newObj[newIndex] = jsonData.Recipe_Name;
    indices = { ...newObj, ...indices};
    localStorage.setItem('Indices', JSON.stringify(indices));

    let recipes = JSON.parse(localStorage.getItem('Recipes'));
    recipes[jsonData.Recipe_Name] = jsonData;
    // recipes.push(jsonData);
    localStorage.setItem('Recipes', JSON.stringify(recipes));
}

var fetchRecipes = function(){
    var message = '';
    var indices = JSON.parse(localStorage.getItem('Indices'));
    var recipeDetails = JSON.parse(localStorage.getItem('Recipes'));
    fetchedRecipeDetails = recipeDetails;
    console.log(recipeDetails);
    var recipes = Object.keys(indices);
    if(recipes.length != 0){
        recipes.forEach(recipe => {
            var recipeName = indices[recipe];
            message += `<div class="recipeCard" onclick="openModal(this.children[0])">
                        
                        <div class="recipeCardName">${recipeName}</div>
                        <img class="recipeCardImg" src="${recipeDetails[recipeName].Image_URL}" alt="Image of ${recipeDetails[recipeName].Recipe_Name}"></img>

                        </div>`;
                        // <button>&#9998;</button>
                        // <button>&#88;</button>
            // console.log(message);
        });
    }
    else{
        message = '<p>Oops! No Recipes</p>';
    }

    document.getElementById('RecipeContainer').innerHTML = message;
}

var openModal = function(clickedRecipe){
    console.log('clicked');
    document.getElementById('recipeModal').style.display = "flex";
    var data = fetchedRecipeDetails[clickedRecipe.innerHTML];
    console.log(data);
    var modalContent = document.getElementById('currentModalRecipe');
    modalContent.innerHTML = `
    <div>
        <div>${data.Recipe_Name}</div>
        <div>Steps to prepare</div>
    </div>
    <div>
        <div class="topRight">
            <div>Ingredients</div>
            <button onclick = closeModal()>X</button>
        </div>
            <img class="modalImage"src="${data.Image_URL}">
    </div>
    `
    
}
var closeModal = function(){
    document.getElementById('recipeModal').style.display = "none";
}
fetchRecipes();