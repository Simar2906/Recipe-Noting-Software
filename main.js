var fetchedRecipeDetails = null;
var fetchedIndices = null;
var editToggle = 0;
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
    fetchedIndices = indices;
    console.log(recipeDetails);
    var recipes = Object.keys(indices);
    if(recipes.length != 0){
        recipes.forEach(recipe => {
            var recipeName = indices[recipe];
            message += `<div>
                        <div class="recipeCard" onclick="openModal(this.children[0])">
                            <div class="recipeCardName">${recipeName}</div>
                            <img class="recipeCardImg" src="${recipeDetails[recipeName].Image_URL}" alt="Image of ${recipeDetails[recipeName].Recipe_Name}"></img>
                        </div>
                        <div>
                            <button class="hiddenButton" onclick="editRecipe(this.parentNode.parentNode)">&#9998;</button>
                            <button class="hiddenButton" onclick="removeRecipe(this.parentNode.parentNode)">&#88;</button>
                        </div>
                        </div>`;
            // console.log(message);
        });
    }
    else{
        message = '<p>Oops! No Recipes</p>';
    }

    document.getElementById('RecipeContainer').innerHTML = message;
}
var removeRecipe = function(buttonClicked){
    var recipeName = buttonClicked.children[0].children[0].innerHTML;
    if(!confirm("Are you sure you want to delete the recipe for: "+recipeName)){
        return;
    }
    
    delete fetchedRecipeDetails[recipeName];

    // remove from dom
    buttonClicked.remove();

    //remove from local storage
    var keys = JSON.parse(localStorage.getItem('Indices'));
    var recipes = JSON.parse(localStorage.getItem('Recipes'));

    for(var key in keys){
        if(keys[key] == recipeName){
            delete keys[key];
        }
    }

    delete recipes[recipeName];
    localStorage.setItem('Recipes', JSON.stringify(recipes));
    localStorage.setItem('Indices', JSON.stringify(keys));
    console.log("Deleted Successfully"); 

}

var editRecipe = function(clickedRecipe){
    var id = null;
    var recipeName = clickedRecipe.children[0].children[0].innerHTML;
    for(var key in fetchedIndices){
        if(fetchedIndices[key] == recipeName){
            id = key;
        }
    }
    window.location.href="add_new.html?id=" + id;
}

var openModal = function(clickedRecipe){
    console.log('clicked');
    document.getElementById('recipeModal').style.display = "flex";
    document.body.classList.add('no-scroll');
    var data = fetchedRecipeDetails[clickedRecipe.innerHTML];
    console.log(data);
    var modalContent = document.getElementById('currentModalRecipe');
    modalContent.innerHTML = `
    <div>
        <div>${data.Recipe_Name}</div>
        <div id="stepsToPrepare">Steps to Prepare</div>
    </div>
    <div>
        <div class="topRight">
            <div>Ingredients</div>
            <button onclick = closeModal()>X</button>
        </div>
        <div id="ingredientDisplay"></div>
        <img class="modalImage"src="${data.Image_URL}">
    </div>
    `
    var i = 1;
    var stepsElement = document.getElementById("stepsToPrepare");
    data.Steps.forEach((step)=>{
        stepsElement.innerHTML += `<div>${i}. ${step}</div>`
        i++;
    });

    var ingredientDisplay =  document.getElementById("ingredientDisplay");
    data.Ingredients.forEach((ingr)=>{
        ingredientDisplay.innerHTML += `<div>&rarr;${ingr.Ingredient_Name}: ${ingr.Ingredient_Quant} ${ingr.Ingredient_Unit}</div>`
    });

}
var closeModal = function(){
    document.getElementById('recipeModal').style.display = "none";
    document.body.classList.remove('no-scroll');
}

var stopPropagation = function(event){
    event.stopPropagation();
}

var enableOptionToggle = function(){
    console.log('Edit Pressed!');
    var eles = document.getElementsByClassName("hiddenButton");
    var button = document.getElementsByClassName("editToggle");
    if(editToggle == 0){
        for(var i = 0; i<eles.length; i++){
            eles[i].style.display = "inline-block";
        }
        button[0].style["filter"] = "brightness(85%)";
        editToggle = 1;
    }
    else{
        for(var i = 0; i<eles.length; i++){
            eles[i].style.display = "none";
        }
        button[0].style["filter"] = "brightness(100%)";
        editToggle = 0;
    }
}

fetchRecipes();
