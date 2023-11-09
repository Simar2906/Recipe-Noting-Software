let counterSTEP = 1;
let openSTEPCount = 1;

let counterING = 1;
let openINGCount = 1;
duplicateIng()
duplicateStep()

function duplicateIng()
{
    let mainDiv = document.getElementById("duplicateIngredient");
    let INGtemplate = `<div id = "INGrow${counterING}" class="INGrow">
    <label for="INGname${counterING}">Ingredient Name</label>
    <input id="INGname${counterING}" name="INGname${counterING}" required>
    <label for="INGquantity${counterING}">Qty</label>
    <input id="INGquantity${counterING}" name="INGquantity${counterING}" type="number" required>
    <select name="INGunit${counterING}">
        <option value="g" selected>g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="ounce">ounce</option>
        <option value="ltr">ltr</option>
        <option value="tsp">tsp</option>
        <option value="tbsp">tbsp</option>
    </select>
    <button type="button" onclick="removeIng(this)" class="remover">-</button>
</div>`
    let newDiv = document.createElement('div');
    newDiv.className = "INGrow";
    newDiv.innerHTML = INGtemplate;
    if(isLastFilledING() || openINGCount == 1)
    {
        mainDiv.appendChild(newDiv);
        counterING += 1;
        openINGCount += 1;
    }
}

function removeIng(button)
{
    if(openINGCount > 1)
    {
        button.parentElement.parentElement.remove();
        openINGCount -= 1;
    }
    
}

function duplicateStep()
{

    let mainDiv = document.getElementById("duplicateStep");
    let STEPtemplate = `<textarea id="STPinfo${counterSTEP}" name="STPinfo${counterSTEP}" placeholder="Write Here"></textarea><button type="button" onclick="removeStep(this)" class="remover">-</button>`

    let newDiv = document.createElement("div");
    newDiv.className = "STProw";
    newDiv.innerHTML = STEPtemplate;
    if(isLastFilledSTEP() || openSTEPCount == 1)
    {
        mainDiv.appendChild(newDiv);
        counterSTEP += 1;
        openSTEPCount += 1;
    }
    
}

function removeStep(button)
{
    if(openSTEPCount > 1)
    {
        button.parentElement.remove();
        openSTEPCount -= 1;
    }
    
}

function isLastFilledING()
{
    let mainDiv = document.getElementById("duplicateIngredient");
    let n = mainDiv.childNodes.length;

    if(n == 0)
        return false;

    let lastIngInput = mainDiv.getElementsByTagName("input")
    if(lastIngInput[2*n-1].value == "" || lastIngInput[2*n-2].value == "")
        return false;
    return true;
}

function isLastFilledSTEP()
{
    let mainDiv = document.getElementById("duplicateStep");
    let n = mainDiv.childNodes.length;
    if(n == 0)
        return false;

    let lastIngInput = mainDiv.getElementsByTagName("textarea")
    if(lastIngInput[n-1].value== "")
        return false;
    return true;
}

function displayImage()
{

    document.getElementById("recipeImage").src = document.getElementById("imgUrl").value;
}

function addToJson()
{
    
}