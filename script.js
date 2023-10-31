// State Variables can be declared outside of the onReady
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
}

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

    // Render changes
    render();
}

// Mushroom regenerates HP
function regen(){
    if(fungusHP < 50 && fungusHP > 0){
        fungusHP++;
    }
    render();
}

function render(){
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

    // Render changes to win state
    let fungus = document.getElementById('freaky-fungus');
    let buttons = document.getElementsByClassName('attack-btn');
    if(fungusHP == 0){
        // Fungus dies
        fungus.classList.replace('walk', 'dead');
    } else if(characterAP == 0){
        // Fungus wins
        fungus.classList.replace('walk', 'jump');
        // Disable buttons
        for(let button of buttons){
            button.setAttribute('disabled', true);
        }
        
    }
}

onReady()
setInterval(regen, 1000);

