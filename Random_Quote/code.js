const quoteEl=document.getElementById("quote");
const btnEl=document.getElementById("btn");
const url="https://api.quotable.io/random";
const authorEl=document.getElementById("author");

async function getquote(){
    try {
        quoteEl.innerText="Loading..."
        btnEl.innerText="Loading..."
        authorEl.innerText="Loading..."
        btnEl.disable=true; 
        const quote=await fetch(url).then((res)=>res.json());
        quoteEl.innerText=quote.content;
        authorEl.innerText="~ "+quote.author;
        btnEl.innerText="get new quote"
        btnEl.disable=false;
    } catch (error) {
        btnEl.disable=false;
        quoteEl.innerText="An error occur try again later"
        authorEl.innerText="An error occur"
        btnEl.innerText="get new quote"
    }
}
getquote();

btnEl.addEventListener("click",getquote);



