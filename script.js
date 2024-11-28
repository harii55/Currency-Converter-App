'use strict'

const dropdown = document.querySelectorAll(".drop-list select");
const button = document.querySelector(".btn")
let result = document.querySelector(".conv");
const rateResults = document.querySelector(".exchange-rates");
rateResults.classList.add('hidden');


//setting up the dropdowns

for (let select of dropdown)
    for (let key in countryList) {
        // console.log(key, countryList[key])

        let newOption = document.createElement("option");
        newOption.innerText = key;
        newOption.value = key;

        if (select.name === "from" && key === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && key === "INR") {
            newOption.selected = "selected"
        }
        select.append(newOption)
    }


//updating flag


dropdown.forEach((drop) => {
    drop.addEventListener("change", (evt) => {
        updateFlag(evt.target)
    })
})


const updateFlag = (element) => {

    let currcode = element.value  //update curr code in the window
    let countrycode = countryList[currcode]
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`

    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}


//get exchange rate button

button.addEventListener('click', getExchangeRate)

async function getExchangeRate(evt) {

    evt.preventDefault()


    let amount = document.querySelector(".amount input")
    let amtVal = amount.value;

    if (amtVal === "" || amtVal < 1 || isNaN(amtVal)) {
        amtVal = 1;
        amount.value = 1;
    }


    let fromCurr = document.querySelector(".from select")
    let toCurr = document.querySelector(".to select")

    // console.log(fromCurr.value.toLowerCase()  +"  " +toCurr.value.toLowerCase());
    const URL = `https://v6.exchangerate-api.com/v6/8c9bf461b7b23db7a10eaaa2/latest/${fromCurr.value}`;
    fetch(URL).then((res) => res.json()).then((data) => {
        // console.log(data);


        //the functionality
        let exchangerate = data.conversion_rates[toCurr.value];
        let totalExchangeRate = (amtVal * exchangerate).toFixed(2);

        result.textContent = `${amount.value} ${fromCurr.value} = ${totalExchangeRate} ${toCurr.value} `



    })

    rateResults.classList.remove('hidden')


};

//Switch Icon Functionality

const switchIcon = document.querySelector(".icon i");

switchIcon.addEventListener("click", () => {

    // Get the "From" and "To" dropdown elements

    let fromDropdown = document.querySelector(".from select");
    let toDropdown = document.querySelector(".to select");

    // Swap the selected values

    let tempValue = fromDropdown.value;
    fromDropdown.value = toDropdown.value;
    toDropdown.value = tempValue;

    // Update the flags

    updateFlag(fromDropdown);
    updateFlag(toDropdown);
});

