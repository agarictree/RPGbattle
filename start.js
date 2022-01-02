import monster from "./monster.js";
import {monsterMoves} from "./t2script.js";

let health = document.querySelector(".health");
let start = document.querySelector(".start");
let magicArmourInput = document.querySelector(".form > #magicArmour");
let phArmourInput = document.querySelector(".form > #physicArmour");
let healthInput = document.querySelector(".form > #health");
let startButton = document.querySelector(".form > button");
let enemy = document.querySelector(".enemy");
let hit = document.querySelector(".hit");
let magicArmourSpan = document.querySelector(".magicArmour");
let physicArmourSpan = document.querySelector(".physicArmour");
let monsterHit = document.querySelector(".hit");
// let wizardMagicDamageSpan = document.querySelector(".magicDamage");
// let wizardPhysicDamageSpan = document.querySelector(".phDamage");
// let wizardMagicArmourSpan = document.querySelector(".magicArmour");
// let wizardPhysicArmourSpan = document.querySelector(".physicArmour");

//mdn
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

let randomIndex = getRandomInt(0, (monster.moves.length - 1));
console.log(randomIndex);

function healthButtonHandler(e) {
    let magicArmNum = magicArmourInput.value;
    let phArmNum = phArmourInput.value;
    let h = healthInput.value;
    magicArmourSpan.textContent = magicArmNum;
    physicArmourSpan.textContent = phArmNum;
    health.textContent = h;
    enemy.textContent = monster.name;
    hit.textContent = monster.moves[randomIndex].name;
    start.remove();

    let random = getRandomInt(0, monster.moves.length - 1);
    monsterHit.textContent = monster.moves[random].name;
    setTimeout(monsterMoves, 1000, random);
}

startButton.addEventListener("click", healthButtonHandler);