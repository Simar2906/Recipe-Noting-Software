let counterSTEP = 1;
let counterING = 1;
duplicateIng()
duplicateStep()

function duplicateIng()
{
    let mainDiv = document.getElementById("duplicateIngredient");
    let INGtemplate = `<div id = "INGrow${counterING}" class="INGrow">
    <label for="INGname${counterING}">Ingredient Name</label>
    <input id="INGname${counterING}" name="INGname${counterING}">
    <label for="INGquantity${counterING}">Qty</label>
    <input id="INGquantity${counterING}" name="INGquantity${counterING}" type="number">
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
    counterING+= 1;
    let newDiv = document.createElement('div');
    newDiv.className = "INGrow";
    newDiv.innerHTML = INGtemplate;
    mainDiv.appendChild(newDiv);
}

function removeIng(button)
{
    button.parentElement.parentElement.remove();
}

function duplicateStep()
{

    let mainDiv = document.getElementById("duplicateStep");
    let STEPtemplate = `<div>
    <textarea id="STPinfo${counterSTEP}" name="STPinfo${counterSTEP}" placeholder="Write Here"></textarea>
    <button type="button" onclick="removeStep(this)" class="remover">-</button>
</div>`

    let newDiv = document.createElement("div");
    newDiv.className = "STProw";
    newDiv.innerHTML = STEPtemplate;
    mainDiv.appendChild(newDiv);
    counterSTEP += 1;
}

function removeStep(button)
{
    button.parentElement.parentElement.remove();
}