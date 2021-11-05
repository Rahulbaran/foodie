'use strict'

const form = document.querySelector('.form');
const recipeField = document.querySelector('.recipe__field')
const msgContainer = document.querySelector('.response__msg__container');
const recipeContainer = document.querySelector('.recipe__cards__container');
const msgHideBtn = document.querySelector('.msg__hide__btn');





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
                while(recipeContainer.lastElementChild) recipeContainer.removeChild(recipeContainer.lastElementChild);

                recipes.forEach(recipe => {
                    const cardHtml = `<div class="recipe__card"><div class="recipe__header">
                    <img src="${recipe.image}" alt="Recipe name" class="recipe__image" loading="lazy"></div><div class="recipe__body"><h4 class="recipe__name">${recipe.title}</h4>
                    <button class="recipe__ingredients__btn btn">Ingredients</button><div class="recipe__ingredients__container">
                    </div></div></div>`;

                    recipeContainer.insertAdjacentHTML('beforeend', cardHtml);
                })
                console.log(recipes);
            }
            else {
                msgContainer.style.display = 'block';
            }

        } 
        else {
            msgContainer.style.display = 'block';
        }
    };

    xhr.onerror = () => {
        console.error('Something is no right');
    }

    xhr.send(JSON.stringify(payload));
});



//Event handler for message hide button
msgHideBtn?.addEventListener('click', () => {
    msgContainer.style.display = 'none';
})