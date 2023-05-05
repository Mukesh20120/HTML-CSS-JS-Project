const btnlistEl=document.querySelectorAll(".btn");
const userchoicetextEl=document.getElementById("userchoice");
const computerchoicetext=document.getElementById("computerchoice");
const userimgEl=document.getElementById("userimg");
const computerimgEl=document.getElementById("computerimg");
const resulttextEl=document.getElementById("resulttext");

btnlistEl.forEach((btnEl,idx)=>{
    btnEl.addEventListener("click",()=>{
        userchoicetextEl.innerText=btnEl.innerText;
        userimgEl.innerHTML=`<img src="img/img${idx+1}.png" alt="" class="icon" />`
        const computerchoiceno= generatechoisebycomputer();
        computerimgEl.innerHTML=`<img src="img/img${computerchoiceno+1}.png" alt="" class="icon" />`
        const ctext=computertext(computerchoiceno);
        computerchoicetext.innerText=ctext;
        const result=finalresult(idx,computerchoiceno);
        resulttextEl.innerText=result;
    })
})
function finalresult(i,j){
    if(i==j)
    return "😒 It's a Draw ";
    else if((i==0 && j==1) || (i==2 && j==0) || (i==1 && j==2))
    return "You Lose";
    else if((i==0 && j==2) || (i==2 && j==1) || (i==1 && j==0))
    return "You Win 🎉🎊";
}

function computertext(i){
    if(i==0)
       return "Rock";
    else if(i==1)
       return "paper";
    else if(i==2)
       return "Scissor";
}

function generatechoisebycomputer(){
   return Math.floor(Math.random()*3);
}



