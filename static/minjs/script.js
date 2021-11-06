"use strict";const form=document.querySelector(".form"),recipeField=document.querySelector(".recipe__field"),msgContainer=document.querySelector(".response__msg__container"),recipeContainer=document.querySelector(".recipe__cards__container"),msgHideBtn=document.querySelector(".msg__hide__btn"),recipeIds=[];form.addEventListener("submit",(e=>{e.preventDefault();const n={recipe:recipeField.value};recipeField.value="",recipeField.focus();const t=new XMLHttpRequest;t.open("POST","/getRecipe"),t.setRequestHeader("content-type","application/json"),t.responseType="json",t.onload=()=>{if(4===t.readyState){const e=t.response;if(e.code)msgContainer.style.display="block";else{const n=e.results;for(;recipeContainer.lastElementChild;)recipeContainer.removeChild(recipeContainer.lastElementChild),recipeIds.length=0;n.forEach(((e,n)=>{recipeIds.push(e.id);const t=`<div class="recipe__card"><div class="recipe__header">\n                    <img src="${e.image}" alt="Recipe name" class="recipe__image" loading="lazy"></div><div class="recipe__body"><h4 class="recipe__name">${e.title}</h4>\n                    <button class="recipe__ingredients__btn btn" id="ingredients--btn__${n}">Ingredients</button><div class="recipe__ingredients__container">\n                    </div></div></div>`;recipeContainer.insertAdjacentHTML("beforeend",t)}))}}else msgContainer.style.display="block"},t.onerror=()=>{msgContainer.style.display="block"},t.send(JSON.stringify(n))})),msgHideBtn?.addEventListener("click",(()=>{msgContainer.style.display="none"})),recipeContainer.addEventListener("click",(e=>{if(e.target.classList.contains("recipe__ingredients__btn")){const n=e.target.nextElementSibling;if("block"!==n.style.display){const[t,i]=e.target.id.split("__"),s={id:recipeIds[Number(i)]};for(;n.lastChild;)n.removeChild(n.lastChild);const r=new XMLHttpRequest;r.open("POST","/getIngredients"),r.setRequestHeader("content-type","application/json"),r.responseType="json",r.addEventListener("load",(()=>{if(200===r.status){r.response.ingredients.forEach((e=>{const t=`<p class="ingredient__name">${e.name}</p>`;n.insertAdjacentHTML("beforeend",t),n.style.display="block"}))}else console.log(r.response)})),r.onerror=()=>console.log("Something went wrong"),r.send(JSON.stringify(s))}else e.target.nextElementSibling.style.display="none"}}));
//# sourceMappingURL=script.js.map
