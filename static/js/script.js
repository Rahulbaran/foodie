'use strict'

//dom element references
const form = document.querySelector('.form');
const recipeField = document.querySelector('.recipe__field')
const msgContainer = document.querySelector('.response__msg__container');
const recipeContainer = document.querySelector('.recipe__cards__container');
const msgHideBtn = document.querySelector('.msg__hide__btn');

//variables to define recipeIds and recipeIngredients array
const recipeIds = [];
const recipeIngredients = [];




//function to get the ingredients of given recipe
const ingredientsFunc = () => {

    recipeIds.forEach(recId => {

        //making http request to get the ingredients
        const httpReq = new XMLHttpRequest();

        httpReq.open('POST' ,'/getIngredients');
        httpReq.setRequestHeader('content-type', 'application/json');
        httpReq.responseType = 'json';

        httpReq.addEventListener('load',  () => {
            if(httpReq.status === 200) {
                const ingredients = httpReq.response.ingredients;
                const ingredientsArray = [];

                ingredients.forEach(ingredient => {
                    ingredientsArray.push(ingredient.name);
                });
                recipeIngredients.push(ingredientsArray);
            }
            else {
                console.error(httpReq.response.message);
            }
        });
        httpReq.onerror = () => console.error('Something went wrong');
        httpReq.send(JSON.stringify({id : recId}));
    }); 
};





//When form is submitted
form.addEventListener('submit', e => {
    //preventing default nature of form
    e.preventDefault();

    const payload = { recipe : recipeField.value };
    recipeField.value = '';
    recipeField.focus();


    //making post request for sending recipe name
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/getRecipe');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.responseType = 'json';

    xhr.onload = () => {
        if (xhr.readyState === 4) {
            const res = xhr.response;

            if(!res.code) {
                const recipes = res.results;

                //deleting all the previous recipes to add new ones
                while(recipeContainer.lastElementChild) {
                    recipeContainer.removeChild(recipeContainer.lastElementChild);
                    recipeIds.length = 0;
                    recipeIngredients.length = 0;
                };
                recipes.forEach((recipe, index) => {   
                    recipeIds.push(recipe.id);

                    const cardHtml = `<div class="recipe__card"><div class="recipe__header">
                    <img src="${recipe.image}" alt="Recipe name" class="recipe__image" loading="lazy"></div><div class="recipe__body"><h4 class="recipe__name">${recipe.title}</h4>
                    <button class="recipe__ingredients__btn btn" id="ingredients--btn__${index}">Ingredients</button><div class="recipe__ingredients__container">
                    </div></div></div>`;

                    recipeContainer.insertAdjacentHTML('beforeend', cardHtml);
                });
                //function call for getting all the ingredients
                ingredientsFunc();
            }
            else { msgContainer.style.display = 'block'; }
        } 
        else { msgContainer.style.display = 'block'; }
    };

    xhr.onerror = () => { msgContainer.style.display = 'block'; }
    xhr.send(JSON.stringify(payload));
});




//Event handler for message hide button
msgHideBtn?.addEventListener('click', () => {
    msgContainer.style.display = 'none';
});





//Event handler for main Container
//Here we will use the concept of traversing (navigation among nodes in dom) 
recipeContainer.addEventListener('click', e => {
    
    if(e.target.classList.contains('recipe__ingredients__btn')) {
        const ingredientsContainer = e.target.nextElementSibling;

        if(ingredientsContainer.style.display !== "block") {
            const [_, btnId] = (e.target.id).split('__');
        
            //removing all the ingredients
            while(ingredientsContainer.lastChild) { 
                ingredientsContainer.removeChild(ingredientsContainer.lastChild);
            };

            recipeIngredients[btnId].forEach(ingredient => {
                const ingreHtml = `<p class="ingredient__name">${ingredient}</p>`;
                ingredientsContainer.insertAdjacentHTML('beforeend', ingreHtml);
            })
            ingredientsContainer.style.display = 'block';
        }    

        else {
            e.target.nextElementSibling.style.display = 'none';
        } 
    }
});
