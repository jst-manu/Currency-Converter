const Base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");


window.addEventListener("load",()=>{
    uprate();

})

for(let select of dropdown){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        flag(evt.target);
    })

}

const flag=(element)=>{
    let currcode =element.value;
    let countrycode=countryList[currcode];
    let newsrc =`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;

}
const uprate= async ()=>{
    let amount=document.querySelector(".amount input");
    let amtval=amount.value;
    if(amtval==="" || amtval<1){
        amtval=1;
        amount.value="1";
    }
    //console.log(fromcurr.value,tocurr.value);
    const url=`${Base_URL}/${fromcurr.value.toString().toLowerCase()}/${tocurr.value.toString().toLowerCase()}.json`;
    let response = await fetch(url);
    let data= await response.json();
    let rate=data[tocurr.value.toLowerCase()];

    let result=amtval*rate;
    msg.innerText=`${amtval} ${fromcurr.value} = ${result} ${tocurr.value}`;

    
}

btn.addEventListener('click', (evt)=>{
    evt.preventDefault();
    uprate();
    
})