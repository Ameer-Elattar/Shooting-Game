let userNameValue=location.search.split("=")[1].split("&")[0].split("+").join(" ");
let gameLevel=location.search.slice(-1);
let userNameSpan=document.querySelector(".userName");
let gameinfo=document.querySelector(".gameInfo");
let timerSpan=document.querySelector(".timer");
userNameSpan.innerText=userNameValue;
let gameCountiner=elementsCountiner();
gameCountiner.appendChild(gameinfo);
let score=0;
 
for(let i=0; i<localStorage.length;i++){
    if(localStorage.key(i).slice(0,6) != 'Player' ){
        continue;
    }
    if(JSON.parse(localStorage.getItem(localStorage.key(i))).playername==userNameValue){
        score=JSON.parse(localStorage.getItem(localStorage.key(i))).score;
    }
}

startGame(userNameValue,gameLevel,timerSpan,score);



