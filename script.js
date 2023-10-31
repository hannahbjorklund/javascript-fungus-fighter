// State Variables can be declared outside of the onReady
// Feel free to make this to what you want!
// Example:

let characterAP = 100;
let fungusHP = 100;

// Storing all attacks as objects in an array
let attacks = [
    {
        name: 'arcaneScepter',
        apCost: 12,
        hpDamage: 14
    },
    {
        name: 'entangle',
        apCost: 23,
        hpDamage: 9
    },
    {
        name: 'dragonBlade',
        apCost: 38,
        hpDamage: 47
    },
    {
        name: 'starFire',
        apCost: 33,
        hpDamage: 25
    }
];

function onReady() {
    console.log("Ready to go!")
    
    // Make sure you check the index.html file! 
    // There are lots of buttons and things ready for you to hook into here!
    
    
    // 🧠 Remember
    // - Handle events that ->
    // - Updates state which is ->
    // - Rendered to the DOM
}

// Clicking a button
// The button corresponds to attacks in the attack array
// Get the apCost and hpDamage for that attack from the array

// Check to make sure we have enough AP to do that attack
//  if yes, then attack and update AP meter
//  if ap hits zero and the fungus is still alive, then monster gets the 'jump' class and we lose
//  if not enough AP to do an attack, the button is disabled

//  Check the fungus's hp
//      if hp will fall below 50, then it regenrates 1 hp every second
//      if hp will hit 0, the fungus is dead. We have to give it the 'dead' class

function makeAttack(event, attackName){
    console.log("Using", attackName);
    // Find the object with the attack name
    let attack = attacks.find(attack => attack.name === attackName);
    // Get the apCost and the hpDamage for the attack
    let apCost = attack.apCost;
    let hpDamage = attack.hpDamage;
    console.log("AP", apCost);
    console.log("HP", hpDamage);
    
    // Subtract the damage from the fungus HP. Fungus HP below zero becomes zero
    if(fungusHP - hpDamage < 0){
        fungusHP = 0;
    } else {
        fungusHP -= hpDamage;
    }
    
    // Check what AP is then adjust it. If character AP is going to fall below zero, set it to zero.
    if(characterAP - apCost < 0){
        characterAP = 0;
    } else {
        characterAP -= apCost;
    }

    console.log("Character AP:", characterAP);
    console.log("Fungus HP:", fungusHP);

    // Render the changes to AP in the DOM
    let apMeter = document.getElementById('ap-meter');
    let apText = document.getElementById('ap-text');
    apMeter.value = characterAP;    
    apText.innerHTML = `${characterAP} AP`;

    // Render changes to HP
    let hpMeter = document.getElementById('hp-meter');
    let hpText = document.getElementById('hp-text');
    hpMeter.value = fungusHP;
    hpText.innerHTML = `${fungusHP} HP`;

}



onReady()