import wizard from "./wizard.js";
import monster from "./monster.js";
import {getRandomInt} from "./start.js";

export let wizardCopy = JSON.parse(JSON.stringify(wizard));
export let monsterCopy = JSON.parse(JSON.stringify(monster));

let health = document.querySelector(".health");
let buttons = document.getElementsByClassName("moves_button");
let monsterMagicDamage = document.querySelector(".monsterMagicDamage");
let monsterPhDamage = document.querySelector(".monsterPhDamage");
let monsterHealthSpan = document.querySelector(".monsterHealth");
let monsterMagicArmourSpan = document.querySelector(".monsterMagicArmour");
let monsterPhysicArmourSpan = document.querySelector(".monsterPhysicArmour");
let wizardMagicDamageSpan = document.querySelector(".magicDamage");
let wizardPhysicDamageSpan = document.querySelector(".phDamage");
let wizardMagicArmourSpan = document.querySelector(".magicArmour");
let wizardPhysicArmourSpan = document.querySelector(".physicArmour");
let monsterHit = document.querySelector(".hit");

wizardCopy.count = 0;
monsterCopy.count = 0;

let arr = [];
for (const i of wizardCopy.moves) {
    arr.push(i.cooldown);
}
let max = Math.max.apply(null, arr);

//определяем начальный уровень брони монстра
export let monsterMagicArmour = 100;
export let monsterPhysicArmour = 100;

//обработка действия Евстафия
function chooseMoveButtonHandler(e) {
    let target = e.target;
    let val = target.value;
    let childs = target.closest(".chooseHit").children;

    console.log(wizardCopy);

    //генерируем случайный ход монстра
    let randomIndex = getRandomInt(0, monster.moves.length - 1);
    monsterHit.textContent = monster.moves[randomIndex].name;

    //перебираем кнопки
    for (let i = 0; i < childs.length; i++) {
        let move = wizardCopy.moves[i];

        if(move.cooldown != 0) {
            move.cooldown--;
        }
        
        //определяем value кнопки
        if(val.split(";")[0] == move.name) {
            //в зависимости от действия, отнимаем от уровня брони кол-во урона

            if(move.cooldown == 0) {
            monsterMagicArmour -= move.magicDmg;
            monsterPhysicArmour -= move.physicalDmg;

            //вытаскиваем текстовое содержимое блоков с информацией
            let magicDamageText = +monsterMagicDamage.textContent;
            let monsterMagicArmourtext = +monsterMagicArmourSpan.textContent;
            let physicDamageText = +monsterPhDamage.textContent;
            let monsterPhysicArmourtext = +monsterPhysicArmourSpan.textContent;
            let magicArmSpan = +wizardMagicArmourSpan.textContent;
            let physicArmSpan = +wizardPhysicArmourSpan.textContent;

            //если урон не равен нулю
            if(move.magicDmg != 0) {
                //отнимаем от уровня здоровья половину балла
                monster.maxHealth -= 0.5;
                monsterHealthSpan.textContent = monster.maxHealth;
                //прибавляем урон к уже существующему урону
                monsterMagicDamage.textContent = (magicDamageText + +move.magicDmg);
                //отнимаем от уровня брони урон
                monsterMagicArmourSpan.textContent = (monsterMagicArmourtext - +move.magicDmg);
            }

            //если кол-во магической брони не равно 0
            if(move.magicArmorPercents != 0) {
                //если кол-во магической брони меньше 100, прибавляем к существующей цифре процент брони
                if(move.magicArmorPercents < 100) {
                    wizardMagicArmourSpan.textContent = magicArmSpan + move.magicArmorPercents;
                }
                //процент брони не должен превышать 100
                if(magicArmSpan > 100 || move.magicArmorPercents == 100){
                    wizardMagicArmourSpan.textContent = 100;
                }
            }
            
            //та же логика, что и с магической броней
            if(move.physicArmorPercents != 0) {
                if(move.physicArmorPercents < 100) {
                    wizardPhysicArmourSpan.textContent = physicArmSpan + move.physicArmorPercents;
                } else {
                    wizardPhysicArmourSpan.textContent = 100;
                }
            }

            //та же логика, что и с магическим уроном
            if(move.physicalDmg != 0) {
                monster.maxHealth -= 0.5;
                monsterHealthSpan.textContent = monster.maxHealth;
                monsterPhDamage.textContent = (physicDamageText + +move.physicalDmg);
                monsterPhysicArmourSpan.textContent = (monsterPhysicArmourtext - +move.physicalDmg);
            }
            move.cooldown = wizard.moves[i].cooldown;

            setTimeout(monsterMoves, 1000, randomIndex);
            if(monster.maxHealth == 0) {
                console.log("Победа!");
            }
        }
            else console.log("Move disabled", move);
            }
    }
}

for (const btn of buttons) {
    btn.addEventListener("click", chooseMoveButtonHandler);
}

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

//функция генерации холодов монстра
export function monsterMoves(index) {

    //вытаскиваем текстовое содержимое блоков
    let h = +health.textContent;
    let wizardMagicDamage = +wizardMagicDamageSpan.textContent;
    let wizardPhysicDamage = +wizardPhysicDamageSpan.textContent;
    let wizardMagicArmour = +wizardMagicArmourSpan.textContent;
    let wizardPhysicArmour = +wizardPhysicArmourSpan.textContent;

    //определяем действие монстра
    
    monsterCopy.count += 1;


    if(monsterCopy.count > max) {
        monsterCopy.count = 0;
    } else {

    let move = generateMoves();
    //если магический урон не равен нулю, произвести действия
    if(move.magicDmg != 0) {

        //отнимаем от текущего уровня здоровья половину балла
        health.textContent = h - 0.5;
        //прибавляем к текущему магическому урону нанесенный новый урон
        wizardMagicDamageSpan.textContent = wizardMagicDamage + move.magicDmg;
        //отнимаем от текущего уровня брони  нанесенный новый урон
        wizardMagicArmourSpan.textContent = wizardMagicArmour - move.magicDmg;
        
    }

    //то же самое что и с магическоим уроном
    if(move.physicalDmg != 0) {
        health.textContent = h - 0.5;
        wizardPhysicArmourSpan.textContent = wizardPhysicArmour - move.physicalDmg;
        wizardPhysicDamageSpan.textContent = wizardPhysicDamage + move.physicalDmg;
    }

    //если кол-во магической брони не равно 0
    if(move.magicArmorPercents != 0) {
        //если кол-во магической брони меньше 100, прибавляем к существующей цифре процент брони
        if(move.magicArmorPercents < 100) {
            monsterMagicArmour += move.magicArmorPercents;
            monsterMagicArmourSpan.textContent = monsterMagicArmour;
        }
        //процент брони не должен превышать 100
        if(monsterMagicArmour > 100) {
            monsterMagicArmourSpan.textContent = 100;
        }
    }
    //то же самое что и с магической броней
    if(move.physicArmorPercents != 0) {
        if(move.physicArmorPercents < 100) {
            monsterPhysicArmour += move.physicArmorPercents;
            monsterPhysicArmourSpan.textContent = monsterPhysicArmour;
        }
        if(monsterPhysicArmour > 100) {
            monsterPhysicArmourSpan.textContent = 100;
        }
    }
    console.log(move);
    }
}