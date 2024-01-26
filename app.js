// it is base URL of currency converter API
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
// it is select 2 select HTML element  
const dropdowns = document.querySelectorAll(".dropdown select")

// get exchange rate button
const btn = document.querySelector("form button");

// fromCurr val means selected any  USD or INR
const fromCurr = document.querySelector(".from select");

// tocurr val means selected any USD or INR
const toCurr = document.querySelector(".to select");

//msg is last message to exchange amount of currency div 
const msg = document.querySelector(".msg");

const main = document.querySelector(".main");

const container = document.querySelector(".container")

const lastmsg = document.querySelector("#lastmsg");


// function

const reset = () => {


  lastmsg.classList.add("hide");
  container.classList.remove("hide");

}

const showExchangedVal = (amval, finalAmount) => {

        // print lastmessage 
        container.classList.add("hide");
        lastmsg.classList.remove("hide");

        lastmsg.innerText = `${amval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`



        // add button also
        const button = document.createElement("button");
        button.innerHTML = "Reset";
        lastmsg.appendChild(button);
        button.classList.add("btn");


        // if reset is click then show container means show currency converter
        button.addEventListener('click', reset);


        // else after 5sec show currency converter
        setTimeout(() => {

          reset();

        }, 5000);

}



// print exchangerate on msg
const updateExchangeRate = async () => {

  let amount = document.querySelector(".amount input");
  let amval = amount.value;
  // console.log(amval);



  // value is -ve or empty then 1
  if (amval === "" || amval < 1) {
    amval = 1;
    amount.value = "1";
  }

  // acccess currCode
  // console.log(fromCurr.value , toCurr.value);


  // access value of converter from API 
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

  // fetch data from api

  let response = await fetch(URL);

  // convert into json object

  let data = await response.json();

  // console.log(response);
  // console.log(data);

  let rate = data[toCurr.value.toLowerCase()];
  console.log(rate);

  let finalAmount = amval * rate;

  // msg.innerText = `1 USD = 80INR`
  msg.innerText = `${amval} ${fromCurr.value} =  ${finalAmount} ${toCurr.value}`;


  // it is extra div run after to click on get exchange rate
  showExchangedVal(amval, finalAmount);

}
// update flag according t buttton clicks
const updateFlag = (element) => {

  // element - select
  let currCode = element.value;   // INR
  // console.log(currCode);
  let countryCode = countryList[currCode];  // IN

  // let update flag of selected country

  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`


  let img = element.parentElement.querySelector("img");
  img.src = newSrc;

}

// add event listener to the dropdown select elements

// this two loops add all countr currency code to the select dropdowns
for (let select of dropdowns) {

  // all ccurrencycode
  for (let currCode in countryList) {

    // make new elem option
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    // append that option to the select dropdown
    // selected USD and INR

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }

    // append option in select
    select.append(newOption);

    // event change select then change flag also
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    })
  }
  // console.log(select);

}






// it is click on get exchange rate  
btn.addEventListener("click", (evt) => {

  // to click on button of get exchange rate is submit to url this event prevent this step

  evt.preventDefault();
  updateExchangeRate();




})


// load of page it give 1 usd = some amount in inr 
window.addEventListener("load", async () => {


  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;

  // fetch data from api

  let response = await fetch(URL);

  // convert into json object

  let data = await response.json();

  // console.log(response);
  // console.log(data);

  let rate = data[toCurr.value.toLowerCase()];


  msg.innerText =  `${1} ${fromCurr.value} =  ${rate} ${toCurr.value}`;
  setTimeout(async () => {

    main.classList.add("hide");
    container.classList.remove("hide");

  }, 2000)


  
})
