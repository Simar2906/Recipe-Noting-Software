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
let counterING = 1;

duplicateIng()
function duplicateIng()
{
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
</div>`

    let newDiv = document.createElement('div');
    newDiv.className = "INGrow";
    newDiv.innerHTML = INGtemplate;
    document.getElementById("duplicateIngredient").appendChild(newDiv);
    counterING+=1;
}
function removeIng()
{
    if(counterING > 1)
    {
        counterING-=1;
        document.getElementById("INGrow"+counterING).remove();
    }
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
