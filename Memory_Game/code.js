const imgcontainerEl=document.querySelector(".img-grid");
const scoreEl=document.getElementById("score");
const levelEl=document.getElementById("level");

let iconlistEl;



const questionmarkEl="./image/question.png"
const closeiconEl="./image/close.png"

const msgEl=`<h1>Hurray You Won the Game 🎉🍾🎊 <br>
congratulation You are 😎1 out of 10 people able to solve this level.</h1>`

let choicearray=[];
let choiceicon=[];
let score=0;
let imgarray = [];
let level=1;

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve, ms);
    });
}

function generateImageArray(){
    let n=Math.pow(2,level);
    for(let i=1;i<=n;i++){
        let temp={idx: `${i}`,img: `./image/icon (${i}).png`}
        imgarray.push(temp);
        imgarray.push(temp);
    }
    imgarray.sort(()=>0.5-Math.random())
}
function increaselevel(){
    score=-2;
    updateScore();
    level++;
    levelEl.innerText=`${level-1}`;
    if(level>4){
        imgcontainerEl.innerHTML=``;
        levelEl.innerText="End";
        imgcontainerEl.innerHTML=msgEl;
    }
    else{
    imgcontainerEl.innerHTML=``;
    imgarray=[];
    generateImageArray();
    AddingImage();
    setTimeout(hideAnswer, imgarray.length*100+(level*500));
    }
}

function updateScore(){
    score+=2;
    scoreEl.innerText=score;
    if(score===imgarray.length){
      increaselevel();
    }
}
function checkMatch(){
   
    if(choiceicon[0]==choiceicon[1]){
         alert("same choice");
         iconlistEl[choiceicon[0]].setAttribute('src',questionmarkEl);
    }
    else{
       if(choicearray[0]==choicearray[1]){
          updateScore();
          iconlistEl[choiceicon[0]].setAttribute('src',closeiconEl);
          iconlistEl[choiceicon[0]].classList.add("remove");
          iconlistEl[choiceicon[0]].removeEventListener("click",flipflop);
          iconlistEl[choiceicon[1]].setAttribute('src',closeiconEl);
          iconlistEl[choiceicon[1]].classList.add("remove");
          iconlistEl[choiceicon[1]].removeEventListener("click",flipflop);
       }
       else{
        iconlistEl[choiceicon[0]].setAttribute('src',questionmarkEl);
        iconlistEl[choiceicon[1]].setAttribute('src',questionmarkEl);
       }
    }
    choicearray=[];
    choiceicon=[];
}
function flipflop(){
   if(choicearray.length<2)
   {const dataidEl=this.getAttribute("data-id");
    this.setAttribute('src',`${imgarray[dataidEl].img}`)
    choiceicon.push(dataidEl);
   choicearray.push(imgarray[dataidEl].idx);}
   
   if(choicearray.length==2){
      setTimeout(checkMatch, 500);
   }
}

async function AddingImage(){
for(let i=0;i<imgarray.length;i++){
    const imgEl=document.createElement("img");
    imgEl.classList.add("img");
    imgEl.setAttribute('src',imgarray[i].img)
    imgEl.setAttribute('data-id',`${i}`)
    imgEl.setAttribute('alt',"img");
    imgEl.addEventListener('click',flipflop);
   imgcontainerEl.appendChild(imgEl);
   await sleep(100);
  }
   iconlistEl=document.querySelectorAll(".img-grid .img");
}
function hideAnswer(){
   
    for(let i=0;i<imgarray.length;i++){
        iconlistEl[i].setAttribute('src',questionmarkEl);
    }
}

generateImageArray();
AddingImage();
setTimeout(hideAnswer, imgarray.length*100+(level*500));
