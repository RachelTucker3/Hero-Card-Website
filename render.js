/**
 * Course: COMP 426
 * Assignment: a05
 * Author: Rachel Tucker
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {
    // TODO: Copy your code from a04 to render the hero card
    let thing = `<div id= "${hero.id}">
    <div class= "card is-centered" style="width: 500px;">
        <div class= "card-image">
        <figure class="image is-square">
            <img src= ${hero.img}>
        </figure>
        </div>
        <div class= "card-content">
        <h1 class = "title has-text-weight-semibold has-text-centered" style= "background-color:${hero.backgroundColor}; color: ${hero.color}">
            <span>${hero.first} ${hero.last}</span>
        </h1>
        <h2>
            <div class = "subtitle is-italic" style= "color: ${hero.color}">
                ${hero.subtitle}
            </div>
            <strong>Alter Ego:</strong> ${hero.name}
            <strong>First Seen:</strong> ${hero.firstSeen}
            <p> ${hero.description}</p>
            <button class="edit" value=${hero.id} onclick="handleEditButtonPress(event)"> Edit </button>
        </h2>
        </div>
        </div>

        </div>`;

        return thing;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    return `
        <div class= "card" style= "width: 500px;">
        <div class= "card is-centered">
        <form id="${hero.id}" class="submit" onsubmit="handleEditFormSubmit(event)">
        <div class= "card-image has-text-centered">
            <figure class="image is-square">
                <div style= "background-color:${hero.backgroundColor}">
                    <img src= ${hero.img}>
                </div>
            </figure>
        </div>
        <h2 class = "subtitle is-bold">
            <span>
            Hero Name: <input id="name" class="input" type="name" value= "${hero.name}"></input>
            First Name: <input id="first" class="input" type="name" value= "${hero.first}"></input>
            Last Name: <input id="last" class="input" type="name" value= "${hero.last}"></input>

            First Seen: <input id="firstSeen" class="input" type="text" value= "${hero.firstSeen}"></input>
            Subtitle: <input id="subtitle" class="input" type="text" value="${hero.subtitle}"></input>
            <p> <textarea id="description" class= "textarea">${hero.description}</textarea> </p>
            </span>
        </h1>
        <button type="reset" class="cancel" value="${hero.id}" onclick="handleCancelButtonPress(event)"> Cancel </button> 
    <button type="submit" class="save" onclick="handleEditFormSubmit(event)"> Submit </button>
    </form>
    </div>
    </div>`;
};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function(event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    // return renderHeroEditForm();
    
    var holder=document.createElement("div");
    holder.innerHTML=renderHeroEditForm(heroicData.find(hero => hero.id == event.target.value));
    document.getElementById(event.target.value).replaceWith(holder);
    return renderHeroEditForm(heroicData.find(hero => hero.id == event.target.value));
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function(event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    var holder=document.createElement("div");
    holder.innerHTML=renderHeroCard(heroicData.find(hero => hero.id == event.target.value));
    document.getElementById(event.target.value).replaceWith(holder);
};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function(event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    const $root = $('#root');
    let myHero = heroicData.find(x=>x.id==event.target.id);
    
    myHero.name = $("input[id=name]").val();
    myHero.first = $("input[id=first]").val();
    myHero.last = $("input[id=last]").val();
    myHero.firstSeen = new Date($("input[id=firstSeen]").val());
    myHero.subtitle = $("input[id=subtitle]").val();
    myHero.description = $("textarea[id=description]").val();
    var myHeroCard = renderHeroCard(myHero);
    
    heroicData.forEach(hero => {
        if (hero.id == myHero.id) {
            hero.first = myHero.first;
            hero.last = myHero.last;
            hero.name = myHero.name;
            hero.subtitle = myHero.subtitle;
            hero.firstSeen = myHero.firstSeen;
            hero.description = myHero.description;
        }
    });

    $('#'+ myHero.id).replaceWith(myHeroCard);



};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    for (let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
    }
    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit butto
    $root.on("click", ".edit", handleEditButtonPress);
    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $root.on("click", ".cancel", handleCancelButtonPress);
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $root.on("submit",".submit", handleEditFormSubmit);
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});

