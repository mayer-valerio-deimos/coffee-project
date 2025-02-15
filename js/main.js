"use strict";
//ARRAY containing coffee objects.
// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
var coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

//VARIABLES that contain the Query Selectors for specific IDs
var tbody = document.querySelector('#coffees');
var submitButton = document.querySelector('#submit');
var roastSelection = document.querySelector('#roast-selection');
var coffeeName = document.querySelector('#coffee-name');
var newSubmit = document.querySelector("#submit_coffee");

//EVENT LISTENERS
submitButton.addEventListener('click', updateCoffees);
roastSelection.addEventListener('change', updateCoffees); //coffee roast event

newSubmit.addEventListener('click', function (e) {
    e.preventDefault();
    let inputName = document.getElementById("new_coffee").value;
    let roast = document.getElementById("type_roast").value;
    let storageArray;

    if(inputName !== ''){
        let newCoffee = {
            id: coffees.length,
            name: inputName,
            roast: roast
        };

        coffees.push(newCoffee);

        //check if there is information in localStorage, if not create a new one
        //if there is, retrieve it, added the new one and send it back again
        if(localStorage.getItem('newCoffee') === null) {
            storageArray = [];
        } else {
            storageArray = JSON.parse(localStorage.getItem("newCoffee"));
        }
        storageArray.push(newCoffee);
        localStorage.setItem('newCoffee', JSON.stringify(storageArray));

        tbody.innerHTML = renderCoffees(coffees);

        //resets the form after adding the coffee
        document.getElementById("add-form").reset();

    }
});

coffeeName.addEventListener('input', function () {
    let results = [];
    let val = this.value;
    /*erase all items from results array to start over*/
    closeAllLists();

    if (!val) {
        tbody.innerHTML = renderCoffees(coffees);
        return false;
    }else{

        coffees.forEach(function (coffee) {
            let name = coffee.name.substr(0, val.length).toUpperCase() == val.toUpperCase();
            let roast = coffee.roast.substr(0, val.length).toUpperCase() == val.toUpperCase();

            if(name || roast){
                results.push(coffee);
            }
        });

    }

    //display results
    tbody.innerHTML = renderCoffees(results);

    //erases results array to avoid displaying double
    closeAllLists();

    //function inside function autocomplete to erase results array
    function closeAllLists() {
        for(let x = 0; x < results.length; x++){
            results.pop();
        }
    }

});

//FUNCTIONS

//function to display a specific coffee inside a div with coffee name iside an Header and roast type
//inside a paragraph.
function renderCoffee(coffee) {
    let html = "<div class='coffees'><h2>" + coffee.name + "</h2><p>" + coffee.roast + "</p></div>";

    return html;
}

//function that displays all the coffees selected from an array and concatenate them
function renderCoffees(coffees) {
    let html = '';
    for(let i= coffees.length -1; i >= 0; i--){
        html += renderCoffee(coffees[i]);
    }
    return html;
}

//function to select and displays coffees selected by either the select
//or the input box
function updateCoffees(e) {
    e.preventDefault(); // don't submit the form, we just want to update the data

    let selectedCoffee = coffeeName.value;
    let selectedRoast = roastSelection.value;
    let filteredCoffees = [];

    //section for input box
    if(selectedCoffee !== ''){
        coffees.forEach(function(coffee) {
            if (coffee.name.toUpperCase() === selectedCoffee.toUpperCase()) {
                filteredCoffees.push(coffee);
            }
        });
    }else{
        //section for selected
        if(selectedRoast === "all"){
            coffees.forEach(function(coffee) {

                filteredCoffees.push(coffee);

            });
        }else{
            coffees.forEach(function(coffee) {
                if (coffee.roast === selectedRoast) {
                    filteredCoffees.push(coffee);
                }
            });
        }
    }

    tbody.innerHTML = renderCoffees(filteredCoffees);
}


//function to display coffees when page loads and adds local storage
//back to the array
function displayCoffees(){

    let getObject = JSON.parse(localStorage.getItem('newCoffee'));

    if(getObject){
        getObject.forEach(function (value) {
        coffees.push(value);
        });
    }

    tbody.innerHTML = renderCoffees(coffees);
}

