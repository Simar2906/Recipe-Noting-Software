let counterSTEP = 1;
let openSTEPCount = 1;
var currentRecipe = null;
var currentRecipe = ReadParam();
let counterING = 1;
let openINGCount = 1;
if(currentRecipe){
    setHeading(currentRecipe);
    document.getElementById('name').value = currentRecipe.Recipe_Name;
    document.getElementById('imgUrl').value = currentRecipe.Image_URL;

    for(var i = 0; i<currentRecipe.Ingredients.length; i++){
        duplicateIng(currentRecipe.Ingredients[i]);
    }
    for(var i = 0; i<currentRecipe.Steps.length; i++){
        duplicateStep(currentRecipe.Steps[i]);
    }
}
else{
    duplicateIng();
    duplicateStep();
}


function ReadParam(){
    var recipeId = location.href.split('?')[1].slice(3);
    var indices = JSON.parse(localStorage.getItem('Indices'))[recipeId];
    return JSON.parse(localStorage.getItem('Recipes'))[indices];
}

function setHeading(currentRecipe){
    var title = document.getElementById('PageTitle');
    title.innerHTML = 'Edit Recipe of: '+ currentRecipe.Recipe_Name;
}

function duplicateIng(ingredient) {
    let mainDiv = document.getElementById("duplicateIngredient");
    let INGtemplate = `<div id = "INGrow${counterING}" class="INGrow">
    <label for="INGname${counterING}">Name</label>
    <input class="INGnames" id="INGname${counterING}" name="INGname${counterING}" required>
    <label for="INGquantity${counterING}">Qty</label>
    <input class="INGquantities" id="INGquantity${counterING}" name="INGquantity${counterING}" type="number" required>
    <label for="INGunit${counterING}">Unit</label>
    <select class="INGunits" id="INGunit${counterING}" name="INGunit${counterING}">
        <option value="g" selected>g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="ounce">ounce</option>
        <option value="ltr">ltr</option>
        <option value="tsp">tsp</option>
        <option value="tbsp">tbsp</option>
        <option value="pcs">pcs</option>
    </select>
    <span type="button" onclick="removeIng(this)" class="remover spanButton">-</span>
</div>`
    let newDiv = document.createElement('div');
    newDiv.className = "INGrow";
    newDiv.innerHTML = INGtemplate;
    if (isLastFilledING() || openINGCount == 1) {
        mainDiv.appendChild(newDiv);
        counterING += 1;
        openINGCount += 1;
    }
    if(ingredient){
        var ingName = document.getElementById('INGname'+(counterING-1).toString());
        var ingQuantity = document.getElementById('INGquantity'+(counterING-1).toString());
        var ingUOM = document.getElementById('INGunit'+(counterING-1).toString());
        ingUOM.value = ingredient.Ingredient_Unit;
        ingQuantity.value = ingredient.Ingredient_Quant;
        ingName.value = ingredient.Ingredient_Name;
    }
}

function removeIng(button) {
    if (openINGCount > 1) {
        button.parentElement.parentElement.remove();
        openINGCount -= 1;
    }

}

function duplicateStep(step) {

    let mainDiv = document.getElementById("duplicateStep");
    let STEPtemplate = `<textarea class="steps" id="STPinfo${counterSTEP}" name="STPinfo${counterSTEP}" placeholder="Write Here" required></textarea><span type="button" onclick="removeStep(this)" class="remover spanButton">-</span>`

    let newDiv = document.createElement("div");
    newDiv.className = "STProw";
    newDiv.innerHTML = STEPtemplate;
    if (isLastFilledSTEP() || openSTEPCount == 1) {
        mainDiv.appendChild(newDiv);
        counterSTEP += 1;
        openSTEPCount += 1;
    }
    if(step){
        var stepInfo = document.getElementById('STPinfo'+(counterSTEP-1).toString());
        stepInfo.value = step;
    }
}

function removeStep(button) {
    if (openSTEPCount > 1) {
        button.parentElement.remove();
        openSTEPCount -= 1;
    }

}

function isLastFilledING() {
    let mainDiv = document.getElementById("duplicateIngredient");
    let n = mainDiv.childNodes.length;

    if (n == 0)
        return false;

    let lastIngInput = mainDiv.getElementsByTagName("input")
    if (lastIngInput[2 * n - 1].value == "" || lastIngInput[2 * n - 2].value == "")
        return false;
    return true;
}

function isLastFilledSTEP() {
    let mainDiv = document.getElementById("duplicateStep");
    let n = mainDiv.childNodes.length;
    if (n == 0)
        return false;

    let lastIngInput = mainDiv.getElementsByTagName("textarea")
    if (lastIngInput[n - 1].value == "")
        return false;
    return true;
}

function displayImage() {

    document.getElementById("recipeImage").src = document.getElementById("imgUrl").value;
}

function addToJsonOnSubmit(event) {
    event.preventDefault();
    // console.log("heya")
    let jsonFormat =
    {
        "Recipe_Name": document.getElementById("name").value,
        "Image_URL": document.getElementById("imgUrl").value,
        "Ingredients": [],
        "Steps": []
    };
    if (localStorage.getItem(jsonFormat.Recipe_Name)) {
        alert('Recipe Name already exists');
        return;
    }
    let ingredientNamesHTML = document.getElementsByClassName("INGnames");
    let ingredientNames = Array.from(ingredientNamesHTML);

    let ingredientQuantHTML = document.getElementsByClassName("INGquantities");
    let ingredientQuants = Array.from(ingredientQuantHTML);

    let ingredientUnitHTML = document.getElementsByClassName("INGunits");
    let ingredientUnits = Array.from(ingredientUnitHTML);

    for (i = 0; i < ingredientNames.length; i++) {
        let f = {
            "Ingredient_Name": ingredientNames[i].value,
            "Ingredient_Quant": ingredientQuants[i].value,
            "Ingredient_Unit": ingredientUnits[i].value
        };
        jsonFormat["Ingredients"].push(f);
    }

    let stepsHTML = document.getElementsByClassName("steps");
    let stepsFinal = Array.from(stepsHTML);

    for (i = 0; i < stepsFinal.length; i++) {
        // console.log(stepsFinal);
        jsonFormat["Steps"].push(stepsFinal[i].value);
    }
    updateData(jsonFormat, currentRecipe);

    window.location.href = 'index.html';
    return true;
}