var checkCreations = function(){
    // alert('Creating local data structuures');
    if(localStorage.getItem('Recipes') == null){
        localStorage.setItem('Recipes', JSON.stringify([]));
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
    recipes.push(jsonData);
    localStorage.setItem('Recipes', JSON.stringify(recipes));
}