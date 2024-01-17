 

class Bullet
{
    constructor( countiner,gun){  
        
        this.shape=document.createElement("div");
        this.shape.classList.add("bullet");
        this.baseElemnt=countiner;
        this.shape.style.top=gun.gunImg.style.top; 
        this.shape.style.left=parseInt(gun.gunImg.style.left)+gun.gunImg.width/2-20+"px"; 
        this.shape.style.visibility="hidden"
        this.baseElemnt.appendChild(this.shape)   
    }
    newBullet(gun){
        this.shape.classList.add("bullet");
        this.shape.style.top=gun.gunImg.style.top; 
        this.shape.style.left=parseInt(gun.gunImg.style.left)+gun.gunImg.width/2-15+"px"; 
        this.shape.style.visibility="hidden"
        this.baseElemnt.appendChild(this.shape)
    }


    moving( ){
        let moveInterval=setTimeout(() =>
         {
            this.shape.style.visibility="visible";
            this.shape.style.top=-30+'px'; 
            this.shape.style.transition="top linear 1s"
        if( this.shape.offsetTop<-30 ){
        clearInterval(moveInterval);
         
        }
        },50);}

        check(gameObject)
         {
            let blocksArray=document.querySelectorAll(".activ")
            let checkInterval=setInterval(() =>
                {
                        
                       
                    for(let i=0;i<blocksArray.length;i++)
                    {
                        
                        if ((blocksArray[i].offsetTop<=  this.shape.offsetTop && blocksArray[i].offsetTop+blocksArray[i].clientHeight>= this.shape.offsetTop) && 
                        (blocksArray[i].offsetLeft-30<= this.shape.offsetLeft &&blocksArray[i].offsetLeft+blocksArray[i].clientWidth >= this.shape.offsetLeft)&&
                        (blocksArray[i].getAttribute("class").includes("activ")))
                        {

                            blocksArray[i].classList.remove("activ");
                            blocksArray[i].classList.add("done")
                            gameObject.destroyedBoxes++;
                            gameObject.score=gameObject.score+2;
                            
                            this.shape.remove();
                            if(blocksArray[i].getAttribute("class").includes("specialItems"))
                            {
                                gameObject.score=gameObject.score+13;
                                blocksArray[i+1].classList.remove("activ")
                                blocksArray[i-1].classList.add("done")
                                blocksArray[i+1].classList.add("activ")
                                blocksArray[i+1].classList.add("done")
                                for(let x=0;x<blocksArray.length;x++)
                                {
                                    if(blocksArray[i].offsetLeft==blocksArray[x].offsetLeft&&blocksArray[i].offsetTop==blocksArray[x].offsetTop+blocksArray[x].clientHeight+10)
                                        
                                        {

                                        blocksArray[x].classList.remove("activ");
                                        blocksArray[x].classList.add("done");
                                            
                                        }
                                }
                                gameObject.destroyedBoxes=gameObject.destroyedBoxes+3;
                            }
                            
                        this.checkIntervalEnd=true;
                            break;
                        }
                        
                        
                    }
                    
                if( this.checkIntervalEnd ==true ||this.shape.offsetTop<-30 ){
                clearInterval(checkInterval)
                this.checkIntervalEnd =false;  
                }
            },1);
                       
        }
} 
    class Gun
    {
        constructor(imgInput,countiner) {
            this.baseElemnt=countiner;
            this.baseElemnt.style.height=window.innerHeight-(window.innerHeight%10)+"px"
            this.gunImg = document.createElement("img");
            this.gunImg.src =imgInput;
            this.gunImg.classList.add("photos")
            this.gunImg.style.top=(parseInt(this.baseElemnt.style.height)-120)+"px" ;
            this.gunImg.style.left=document.body.clientWidth/2+"px";
            this.baseElemnt.append(this.gunImg);
        
        }
        movingWithArrows()
        {
            window.addEventListener("keydown",(event)=>
        {
                if(event.key==="ArrowRight"&& parseInt( this.gunImg.style.left)<=(document.body.clientWidth-this.gunImg.width-5))
                {
                    this.gunImg.style.left=( parseInt(  this.gunImg.style.left)+ 20)+"px";
                }

                else if(event.key==="ArrowLeft" && parseInt(  this.gunImg.style.left)>1){
                    this.gunImg.style.left=( parseInt(  this.gunImg.style.left)- 20)+"px";
                }
            })
        }
    }
    
    class Blocks{
        constructor(countiner){
            this.baseElemnt=countiner;
            this.blokcsCountinr=document.createElement("div");
            this.blokcsCountinr.classList.add("blokcsCountinr");
            for(let i=0;i<80;i++){
            this.blockItem=document.createElement("div"); 
            this.blockItem.classList.add("blokcItem", "activ");
            
            if (Math.floor(Math.random() * 120)===i){
                this.blockItem.classList.add("specialItems");
            }
            else if(Math.floor(Math.random() * 120)===i){
                this.blockItem.classList.add("specialItems");
            }
            else if(Math.floor(Math.random() * 120)===i){

                this.blockItem.classList.add("specialItems");
            }
            this.blokcsCountinr.appendChild(this.blockItem);
            }
            this.baseElemnt.appendChild(this.blokcsCountinr);
        }  
    }
    class Game{
        
            constructor(){
                this.gameGun=new Gun(`./images/2.png`,gameCountiner);
                this.gameGun.movingWithArrows();
                this.gameBlocks=new Blocks(gameCountiner);
                
                this.score=0;
                this.destroyedBoxes=0;
                this.gameBullets=new Array();
                this.gameBulletsCount=0;
                this.gameBulletsSeterCount=0;
            }
            throwBullets()
            {
                let keysPressed = {};
                document.addEventListener('keydown', (event) => {
                    keysPressed[event.key] = true;
                    if(keysPressed["ArrowRight"]&&keysPressed[" "]&& parseInt( this.gameGun.gunImg.style.left)<=(document.body.clientWidth-this.gameGun.gunImg.width-5))
                {
                    this.gameGun.gunImg.style.left=( parseInt(  this.gameGun.gunImg.style.left)+ 20)+"px";
                        if(this.gameBulletsCount<30){
                        this.gameBullets[this.gameBulletsCount]=new Bullet(gameCountiner,this.gameGun) ;
                        this.gameBullets[this.gameBulletsCount].moving();
                        this.gameBullets[this.gameBulletsCount].check(this); 
                        this.gameBulletsCount++;
                    }
                    else{
                        this.gameBullets[this.gameBulletsSeterCount].newBullet(this.gameGun);
                        this.gameBullets[this.gameBulletsSeterCount].moving();
                        this.gameBullets[this.gameBulletsSeterCount].check(this); 
                        this.gameBulletsSeterCount++;
                        if(this.gameBulletsSeterCount==30){
                            this.gameBulletsSeterCount=0;
                        }
            
                    }
                        
                }
                else if(keysPressed["ArrowLeft"]&&keysPressed[" "]&& parseInt(  this.gameGun.gunImg.style.left)>1)
                {
                    this.gameGun.gunImg.style.left=( parseInt(  this.gameGun.gunImg.style.left)- 20)+"px";
                        if(this.gameBulletsCount<30){
                        this.gameBullets[this.gameBulletsCount]=new Bullet(gameCountiner,this.gameGun) ;
                        this.gameBullets[this.gameBulletsCount].moving();
                        this.gameBullets[this.gameBulletsCount].check(this); 
                        this.gameBulletsCount++;
                    }
                    else{
                        this.gameBullets[this.gameBulletsSeterCount].newBullet(this.gameGun);
                        this.gameBullets[this.gameBulletsSeterCount].moving();
                        this.gameBullets[this.gameBulletsSeterCount].check(this); 
                        this.gameBulletsSeterCount++;
                        if(this.gameBulletsSeterCount==30){
                            this.gameBulletsSeterCount=0;
                        }
            
                    }
                        
                }
                else if(keysPressed[" "]){
                        if(this.gameBulletsCount<30){
                        this.gameBullets[this.gameBulletsCount]=new Bullet(gameCountiner,this.gameGun) ;
                        this.gameBullets[this.gameBulletsCount].moving();
                        this.gameBullets[this.gameBulletsCount].check(this); 
                        this.gameBulletsCount++;
                    }
                    else{
                        this.gameBullets[this.gameBulletsSeterCount].newBullet(this.gameGun);
                        this.gameBullets[this.gameBulletsSeterCount].moving();
                        this.gameBullets[this.gameBulletsSeterCount].check(this); 
                        this.gameBulletsSeterCount++;
                        if(this.gameBulletsSeterCount==30){
                            this.gameBulletsSeterCount=0;
                        }
            
                    }
                        
                }
                if(keysPressed["ArrowRight"]&& parseInt( this.gameGun.gunImg.style.left)<=(document.body.clientWidth-this.gameGun.gunImg.width-5))
                {
                    this.gameGun.gunImg.style.left=( parseInt(  this.gameGun.gunImg.style.left)+ 20)+"px";
            
                }
            
                if(keysPressed["ArrowLeft"]&& parseInt(  this.gameGun.gunImg.style.left)>1)
                {
                    this.gameGun.gunImg.style.left=( parseInt(  this.gameGun.gunImg.style.left)- 20)+"px";
                }
            
             
            
                 });
                 document.addEventListener('keyup', (event) => {
                    keysPressed[event.key] = false
                 });
                
                
             
            }
        
    
        
    moveBlocks(level,boxsArray){
        this.arrOfBlocks=boxsArray;
        this.gameBlocks.blokcsCountinr.style.paddingTop="1px";
        this.gameBlocks.blokcsCountinr.style.height="1px";
        let downCounter=0;
        if(level==1)
        {
            let id=setInterval(() => 
            {
                 
                let counter=this.arrOfBlocks.length-1;
                let flag=0;
                this.gameBlocks.blokcsCountinr.style.paddingTop=parseInt(this.gameBlocks.blokcsCountinr.style.paddingTop)+3+"px";
                downCounter++;
                if(swal.getState().isOpen)
                {
                    clearInterval(id);
                }
                
                    for(let i=counter ; i>counter-20;i--)
                    {
                        
                        if(this.arrOfBlocks[i].getAttribute("class").includes("done"))
                        {
                            flag++;
                        }
                        
                    }
                
                if(flag==20)
                {
                    for(let i=counter; i>counter-20;i--)
                    {
                        this.arrOfBlocks[i].classList.remove("done")
                        this.arrOfBlocks[i].classList.add("activ")
                        this.arrOfBlocks[i].style.backgroundColor="black";
                        this.gameBlocks.blokcsCountinr.prepend(this.arrOfBlocks[i]);
                    }
                    flag=0;
                    downCounter=0;
                    this.gameBlocks.blokcsCountinr.style.height=parseInt(this.gameBlocks.blokcsCountinr.style.height)-45+"px";
                }
                else if(downCounter==10)
                {
                    for(let i=0;i<20;i++)
                    {
                        this.blockItem=document.createElement("div"); 
                        this.blockItem.classList.add("blokcItem", "activ");
                        
                        if (Math.floor(Math.random() * 120)===i){
                            this.blockItem.classList.add("specialItems");
                        }
                        else if(Math.floor(Math.random() * 120)===i){
                            this.blockItem.classList.add("specialItems");
                        }
                        else if(Math.floor(Math.random() * 120)===i){
            
                            this.blockItem.classList.add("specialItems");
                        }
                        this.gameBlocks.blokcsCountinr.prepend(this.blockItem);
                        }

                        this.arrOfBlocks=document.querySelectorAll(".blokcItem");
                
                        this.gameBlocks.blokcsCountinr.style.height=parseInt(this.gameBlocks.blokcsCountinr.style.height)+45+"px";
                        downCounter=0;

                }
                if(swal.getState().isOpen)
                {
                    clearInterval(id);
                }
                else if(this.gameBlocks.blokcsCountinr.clientHeight+this.gameBlocks.blokcsCountinr.offsetTop>=this.gameGun.gunImg.offsetTop)
                {
                    clearInterval(id);
                    gameOver();
                }
            }, 1000);
        }
        
        
        else if(level ==2){
            let id=setInterval(() => {
                if(swal.getState().isOpen){
                    clearInterval(id);
                }
                let flag=0;
                this.gameBlocks.blokcsCountinr.style.paddingTop=parseInt(this.gameBlocks.blokcsCountinr.style.paddingTop)+3+"px";
                if(swal.getState().isOpen){
                    clearInterval(id);
                }else{
                    for(let i=counter; i>counter-20;i--){
                        if(this.arrOfBlocks[i].getAttribute("class").includes("done")){
                            flag++;
                        }
                    }
                }
                if(flag==20){
                    for(let i=counter; i>counter-20;i--){
                        this.arrOfBlocks[i].remove();
                    }
                    counter-=20;
                    flag=0;
                }
                
                if(this.gameBlocks.blokcsCountinr.clientHeight+this.gameBlocks.blokcsCountinr.offsetTop>=this.gameGun.gunImg.offsetTop){
                    clearInterval(id);
                    gameOver();
                }
            }, 700);
        }
    }
}
const elementsCountiner=()=>{
    let gameHTMLCountiner= document.createElement("div");
    gameHTMLCountiner.classList.add("base");
    document.body.append( gameHTMLCountiner);
    return gameHTMLCountiner;
}
const gameTimer=function(timer){
    timer.innerText=timer.innerText= `2:00`;
    let min = 1;
    let sec= 59;
    let id=setInterval(() => {
        if(swal.getState().isOpen){
            clearInterval(id);
        }
        sec--;
        if(sec<10)
        timer.innerText= `${min}: 0${sec}`;
        else
        timer.innerText= `${min}: ${sec}`;
        if(min == 0 && sec == 0){
            clearInterval(id);
            gameOver();
        }
        if(sec==0){
            min--;
            sec=60;
        }
    }, 1000);
}
const startGame=function(name,level,timer,lastScore=0){
    swal({
        title:`Welcome ${name} To Space Shooter`,
        text:`Your last score ${lastScore}`,
        button:{
            text:"Start",
            className: "startButton",
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    }).then(()=>{
        gameTimer(timer);
        let newGame=new Game();
        newGame.throwBullets();
        newGame.moveBlocks(level,document.querySelectorAll(".blokcItem"));
        let scoreSpan=document.querySelector(".score");
        let interval=setInterval(() => {
            scoreSpan.innerText=newGame.score;
            
            if(newGame.destroyedBoxes>=300){
                winPopUp(newGame.score);
                document.querySelector(".blokcsCountinr").remove();
                clearInterval(interval);
                for(let i=0; i<localStorage.length;i++){
                    if(JSON.parse(localStorage.getItem(localStorage.key(i))).playername==name){
                        localStorage.setItem(localStorage.key(i),JSON.stringify({playername:name,score:newGame.score}));
                    }
                }
            }
            if(swal.getState().isOpen){
                
                clearInterval(interval);
                for(let i=0; i<localStorage.length;i++){
                    if(JSON.parse(localStorage.getItem(localStorage.key(i))).playername==name){
                        localStorage.setItem(localStorage.key(i),JSON.stringify({playername:name,score:newGame.score}));
                    }
                }
                document.querySelector(".blokcsCountinr").remove();
            }
            
        }, 100);
    
    })
}
const winPopUp=function(score){
    swal({
        title:`You Won`,
        text:`Your score is ${score}`,
        icon:"success",
        button:{
            text:"Again",
            className: "startButton",
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    }).then(()=>{
        location.href="";
    })
}
const gameOver=function(){
    
    swal({
        
        title:`Game Over`,
        icon:"error",
        buttons:{
            cancel:{
                text: "Exit",
                value: false,
                visible: true,
                className: "btnone",
                closeModal: true,
            }, confirm: {
                text: "Again",
                value: true,
                visible: true,
                className: "btntwo",
                closeModal: true
            }
        },
        closeOnClickOutside: false,
        closeOnEsc: false,
    }).then((event)=>{
        if(event){
            location.href="./index.html";
        }else{
            swal("Game Ended").then(()=>{
                location.href="./index.html";
            });
            
        }
    })
}
const CheckLocal=function(value){
    for(let i=0; i<localStorage.length;i++){
        console.log(localStorage.getItem(localStorage.key(i)).playername,value)
        if(JSON.parse(localStorage.getItem(localStorage.key(i))).playername==value){
            return true;
        }
    }
    return false;
}

