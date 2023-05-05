const barcontainerEl=document.querySelector(".bar-container");
const btngenEl=document.getElementById("unsorted-array");
const sortbtnEl=document.getElementById("bubblesort");
const sizeEls=document.querySelectorAll(".numbers");

let size=50;
let unsorted_array=new Array(size);
let spd=100;
let pre_spd=0;


//speed selection
const spdEls=document.querySelectorAll(".spd");
for(let i=0;i<spdEls.length;i++){
    spdEls[i].addEventListener("click",()=>{
      spdEls[pre_spd].classList.remove("active");
      spdEls[i].classList.add("active");
      pre_spd=i;
      if(i===0)
        spd=100;
      else if(i===1)
         spd=10;
      else if(i===2)
        spd=0.1;
    })
}
//end of speed selection


//fillunsorted array
function fillunsortedArray(){
    for(let i=0;i<size;i++){
        unsorted_array[i]=randomnumber(10,500);
    }
}

//create random numbers
function randomnumber(mini,maxi){
 return Math.floor(Math.random()*(maxi-mini+1)+mini);
};

//creating array 
function GenerateRandomNo(){
    for(let i=0;i<size;i++){
        const barEl=document.createElement("div");
        const randomno=unsorted_array[i];
        barEl.style.height=`${randomno}px`;
        barEl.classList.add("bar");
        barcontainerEl.appendChild(barEl);
     }    
}
function removeelement(){
   const divEl=document.querySelectorAll(".bar");
   if(divEl){
    divEl.forEach(d=>{
       d.parentNode.removeChild(d);
    })
   }
}

btngenEl.addEventListener("click",()=>{
  removeelement();
  fillunsortedArray();
  GenerateRandomNo();
})


document.addEventListener("DOMContentLoaded",()=>{
    fillunsortedArray();
    GenerateRandomNo();
})

sortbtnEl.addEventListener("click",()=>{
    bubblesort();
})

//size 
let pre=0;
for(let i=1;i<=4;i++){
    sizeEls[i-1].addEventListener("click",()=>{
        sizeEls[pre].classList.remove("active");
        sizeEls[i-1].classList.add("active");
        pre=i-1;
        size=(i)*25 + 25;
        removeelement();
        fillunsortedArray();
        GenerateRandomNo();
    })
}
//end size




//sorting algorithim
function sleep(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve, ms);
    })
}

async function bubblesort(){
    const barsEl=document.querySelectorAll(".bar");
for(let i=0;i<size;i++){
    for(let j=0;j<size-i-1;j++){
        if(unsorted_array[j]>unsorted_array[j+1]){
            for(let k=0;k<size-i;k++){
                if(j!=k && j+1!=k)
                barsEl[k].style.backgroundColor="black";
            }
            //swaping the variable
            let temp=unsorted_array[j];
            unsorted_array[j]=unsorted_array[j+1];
            unsorted_array[j+1]=temp;
            //swaping the bars
            barsEl[j].style.backgroundColor="red";
           barsEl[j].style.height= `${unsorted_array[j]}px`;
           barsEl[j].style.backgroundColor="white";
           barsEl[j+1].style.backgroundColor="white";
           barsEl[j+1].style.height= `${unsorted_array[j+1]}px`;
           barsEl[j+1].style.backgroundColor="red";
           if(spd!=-1)
             await sleep(`${spd}`);
        }
    }
    barsEl[size-i-1].style.backgroundColor="green";
    if(spd!=-1)
      await sleep(`${spd}`);
}
}


//End of sorting algorithim


