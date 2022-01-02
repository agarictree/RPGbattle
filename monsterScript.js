import wizard from "./wizard.js";
import monster from "./monster.js";
import {monsterMagicArmour, monsterPhysicArmour} from "./t2script.js";

let monsterHealthSpan = document.querySelector(".monsterHealth");
let monsterMagicArmourSpan = document.querySelector(".monsterMagicArmour");
let monsterPhysicArmourSpan = document.querySelector(".monsterPhysicArmour");


let monsterHealth = monster.maxHealth;
let monsterCopy = JSON.parse(JSON.stringify(monster));

console.log(monsterMagicArmour, monsterPhysicArmour);
monsterHealthSpan.textContent = monsterHealth;
monsterMagicArmourSpan.textContent = monsterMagicArmour;
monsterPhysicArmourSpan.textContent = monsterPhysicArmour;

