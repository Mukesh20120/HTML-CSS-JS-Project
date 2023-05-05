const btnEl=document.getElementById("btn");
const factEl=document.getElementById("fact");

const apiurl="https://api.api-ninjas.com/v1/facts?limit=1";

const apikey="bYkSqd64HlGAqcdz6ucgFA==M3eBXtEE3a1yhgW4";

const options = {
    method:"Get",
    headers: {
        "X-Api-Key": apikey,
    },
};

async function getfact(){
try {
    btnEl.disabled=true;
  btnEl.innerText="Getting...."
  factEl.innerText="Updating...";
  const response= await fetch(apiurl,options);
  const data= await response.json();
  factEl.innerText=data[0].fact;
  btnEl.disabled=false;
  btnEl.innerText="Get new Fact";
} catch (error) {
    factEl.innerText="An error occur try again later";
  btnEl.disabled=false;
  btnEl.innerText="Get new Fact";
}
}

btnEl.addEventListener("click",getfact);



