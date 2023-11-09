// const form = document.getElementById("RecipeForm");
// form.addEventListener('submit', (event) =>{
//     event.preventDefault();
//     const fd = new FormData(form)
//     for(item of fd)
//     {
//         console.log(item)
//     }
//     // console.log(document.getElementById("INGquantity").value);
// }
// )
let counterSTEP = 1;
duplicateIng()
duplicateStep()
function duplicateIng()
{
    let mainDiv = document.getElementById("duplicateIngredient");
    let mainDivChildren = document.getElementById("duplicateIngredient").childNodes;
    
    let length = mainDivChildren.length;
    let INGtemplate = `<div id = "INGrow${length+1}" class="INGrow">
    <label for="INGname${length+1}">Ingredient Name</label>
    <input id="INGname${length+1}" name="INGname${length+1}">
    <label for="INGquantity${length+1}">Qty</label>
    <input id="INGquantity${length+1}" name="INGquantity${length+1}" type="number">
    <select name="INGunit${length+1}">
        <option value="g" selected>g</option>
        <option value="kg">kg</option>
        <option value="ml">ml</option>
        <option value="ounce">ounce</option>
        <option value="ltr">ltr</option>
        <option value="tsp">tsp</option>
        <option value="tbsp">tbsp</option>
    </select>
    <button type="button" onclick="removeIng(this)" class="duplicator">-</button>
</div>`
console.log(length)
    let newDiv = document.createElement('div');
    newDiv.className = "INGrow";
    newDiv.innerHTML = INGtemplate;
    mainDiv.appendChild(newDiv);
}
function removeIng(button)
{
    button.parentElement.remove();
    // if(counterING > 2)
    // {
    //     counterING-=1;
    //     document.getElementById("INGrow"+counterING).remove();
    // }
}

function duplicateStep()
{
    let STEPtemplate = `<div>
    <span id="stepNo.">${counterSTEP}:</span>
    <textarea id="STPinfo${counterSTEP}" name="STPinfo${counterSTEP}" placeholder="Write Here"></textarea>
</div>`

    let newDiv = document.createElement("div");
    newDiv.className = "STProw";
    newDiv.innerHTML = STEPtemplate;
    document.getElementById("duplicateStep").appendChild(newDiv);
    counterSTEP += 1;
}






























// function duplicateIng()
// {
//     console.log("pressed");
//     let originalING = document.getElementById("duplicateIngredient");
//     let newING = originalING.cloneNode(true);
//     newING.id = newING.id + counterING
//     console.log(newING)

//     let children = newING.childNodes
//     let length = children.length
//     for(i = 0; i<length; i++)
//     {
        
//         if(children[i].id == "INGrow")
//         {
//             console.log("asfd");
//             let grandChild = children[i];
//             let lengthGrand = grandChild.length;
//             console.log(grandChild);
//             for(j = 0; j<lengthGrand; j++)
//             {
                
//                 if(grandChild[j].id == "INGname" || grandChild[j].id == "INTquantity")
//                 {
//                     grandChild[j].nodeValue = "";
//                     grandChild[j].id == grandChild[j].id + counterING;
//                 }
//             }
//         }
        
//     }
//     // newING.firstChild("INGname").value = "";
//     // newING.getElementById("INGquantity").value = "";

//     newING.querySelector
//     let form = document.getElementById('RecipeForm');

//     form.insertBefore(newING, document.getElementById("Step"));

// }
