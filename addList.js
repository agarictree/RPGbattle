import {wizardCopy} from "./t2script.js";

let buttons = document.getElementsByClassName("moves_button");

for (let i = 0; i < wizardCopy.moves.length; i++) {
    let move = wizardCopy.moves[i];
    let str = `${move.name}; количество попыток - ${move.cooldown}; урон - м: ${move.magicDmg}, ф: ${move.physicalDmg}`;
    buttons[i].value = str;
    buttons[i].textContent = str;
}
