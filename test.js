import monster from "./monster.js";
import {getRandomInt} from "./start.js";
import { monsterCopy, wizardCopy } from "./t2script.js";

monsterCopy.count = 0;

function getRandomMove(obj) {
    let index = getRandomInt(0, obj.moves.length - 1);
    let move = obj.moves[index];
    return move;
}

function generateMoves() {
    let move = getRandomMove(monsterCopy);
    if(monsterCopy.count == move.cooldown||move.cooldown == 0) {
        return move;
    } else {
        console.log("move disabled", move.name);
        return generateMoves();
    }
}

// getRandomMove(monsterCopy);
setInterval(() => {
    monsterCopy.count += 1;
    if(monsterCopy.count == 5) {
        monsterCopy.count = 0;
    } else {
        console.log(generateMoves());
    }
}, 1000);
