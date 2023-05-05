const btnEl=document.getElementById("btn");
const dish_nameEl=document.getElementById("dish-name");
const dish_imgEl=document.querySelector(".dish-img");
const countryEl=document.getElementById("country");
const instructionEl=document.querySelector(".instruction-list");
const ingredientEl=document.querySelector(".instruct");

const url="https://www.themealdb.com/api/json/v1/1/random.php";

let instructionlist;
let ingredient=[];
let measure=[];

function fillIngredientMeasure(newarrdish){
   let j=1,k=1;
   ingredient=[];
   measure=[];
   for(let i=0;i<newarrdish.length;i++){
      if(newarrdish[i][0]===`strIngredient${j}` && newarrdish[i][1]){
         ingredient.push(newarrdish[i][1]);
         j++;
      }
      if(newarrdish[i][0]===`strMeasure${k}` && newarrdish[i][1]){
         measure.push(newarrdish[i][1]);
         k++;
      }
   }
}
function addIngredent(){
  
   for(let i=0;i<ingredient.length && i<16;i++){
      let liEl=document.createElement("li"); 
      liEl.innerText=`${ingredient[i]}-----------${measure[i]}`;
      ingredientEl.appendChild(liEl);
   }
}
async function GetnewDish(){
   dish_nameEl.innerText="Loading...";
   dish_imgEl.src="Spinner.svg";
   countryEl.innerText="Loading...";
   btnEl.innerText="Loading..."
   btnEl.disable=true;
   instructionEl.innerHTML='<h1>Loading...</h1>';
   const newdish=await fetch(url).then((res)=>res.json());
   dish_nameEl.innerText=newdish.meals[0].strMeal;
   dish_imgEl.src=newdish.meals[0].strMealThumb;
   countryEl.innerText=newdish.meals[0].strArea;

   const newarrdish=Object.entries(newdish.meals[0]);
   fillIngredientMeasure(newarrdish);
   
   instructionEl.innerHTML='';
   instructionlist=newdish.meals[0].strInstructions.split('.');
   instructionlist.forEach((instruction,idx) => {
    if(instruction!=""){
      let liEl=document.createElement("li");
      liEl.innerText=`Step${idx+1}: `+instruction.trim();
      instructionEl.appendChild(liEl);
    }
   });
   ingredientEl.innerHTML='';
   addIngredent();
   btnEl.disable=false;
   btnEl.innerText="Get New Dish";
}



btnEl.addEventListener("click",GetnewDish);

GetnewDish();
