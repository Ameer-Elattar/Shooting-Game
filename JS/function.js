
class Bullet{
    constructor( countiner){ 
        this.shape=document.createElement("div");
        this.baseElemnt=countiner;
    }
    newBullet(gun){
        this.shape.classList.add("bullet");
        this.shape.style.top=gun.gunImg.style.top; 
        this.shape.style.left=parseInt(gun.gunImg.style.left)+gun.gunImg.width/2-15+"px"; 
        this.shape.style.visibility="hidden"
        this.baseElemnt.appendChild(this.shape)
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
                    this.gunImg.style.left=( parseInt(  this.gunImg.style.left)+ 10)+"px";
                }

                else if(event.key==="ArrowLeft" && parseInt(  this.gunImg.style.left)>1){
                    this.gunImg.style.left=( parseInt(  this.gunImg.style.left)- 10)+"px";
                }
            })
        }
    }
    
    class Blocks{
        constructor(countiner){
            this.mineCountiner=countiner;
            this.blokcsCountinr=document.createElement("div");
            this.blokcsCountinr.classList.add("blokcsCountinr");
            for(let i=0;i<120;i++){
            this.blockItem=document.createElement("div"); 
            this.blockItem.classList.add("blokcItem");
            
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
            this.mineCountiner.appendChild(this.blokcsCountinr);
        }
        blocksFall(gameObject,index){
            this.fallbox=document.createElement("div");
                this.fallbox.classList.add("blokcItem");
                this.fallbox.style.position="absolute";
                this.fallbox.style.top=  gameObject.arrOfBlocks[index].offsetTop+"px";
                this.fallbox.style.left=  (gameObject.arrOfBlocks[index].offsetLeft-5)+"px";
                this.blokcsCountinr.appendChild(this.fallbox);
            setTimeout(()=>{
                this.fallbox.style.transition="top 600ms ease";
                this.fallbox.style.top= gameObject.gameGun.gunImg.style.top;
            },20)
            setTimeout(()=>{
                this.fallbox.remove();
                delete this.fallbox;
            },100)
            
        }
        
    }
    class Game{
        #criticalSection;
        #intervalEnd;
        #score;
        constructor(){
            this.gameGun=new Gun(`images/2.png`,elementCountiner);
            
            this.gameGun.movingWithArrows();
            
            this.gameBullets=new Bullet(elementCountiner);
            this.gameBlocks=new Blocks(elementCountiner);
            this.arrOfBlocks=document.querySelectorAll(".blokcItem");
            this.#criticalSection=false;
            this.#score=0;
        }
        get score(){
            return this.#score;
        }
        throwBalls(){
            window.onkeydown=(event)=>{
                if(event.key==" "){
                    if(this.#criticalSection===false){
                        this.#criticalSection=true;
                    this.gameBullets.newBullet(this.gameGun) ; 
                let id=setInterval(() => {
                        this.gameBullets.shape.style.visibility="visible";
                        this.gameBullets.shape.style.top= parseInt( this.gameBullets.shape.style.top)-5+'px';
                            for(let i=0;i<this.arrOfBlocks.length;i++){
                                if ((this.arrOfBlocks[i].offsetTop<=  this.gameBullets.shape.offsetTop && this.arrOfBlocks[i].offsetTop+this.arrOfBlocks[i].clientHeight>= this.gameBullets.shape.offsetTop) && 
                                (this.arrOfBlocks[i].offsetLeft-30<= this.gameBullets.shape.offsetLeft &&this.arrOfBlocks[i].offsetLeft+this.arrOfBlocks[i].clientWidth >= this.gameBullets.shape.offsetLeft)&&
                                (!this.arrOfBlocks[i].getAttribute("class").includes("done")) )
                                {
                                    this.arrOfBlocks[i].classList.add("done");
                                    this.#score=this.#score+2;
                                    this.gameBullets.shape.remove();
                                    this.gameBlocks.blocksFall(this,i);
                                    if(this.arrOfBlocks[i].getAttribute("class").includes("specialItems"))
                                    {
                                        this.#score=this.#score+13;
                                        this.arrOfBlocks[i+1].classList.add("done")
                                        this.arrOfBlocks[i-1].classList.add("done")
                                        for(let x=0;x<this.arrOfBlocks.length;x++){
                                            if(this.arrOfBlocks[i].offsetLeft==this.arrOfBlocks[x].offsetLeft&&this.arrOfBlocks[i].offsetTop==this.arrOfBlocks[x].offsetTop+this.arrOfBlocks[x].clientHeight+10||
                                                this.arrOfBlocks[i].offsetLeft==this.arrOfBlocks[x].offsetLeft&&this.arrOfBlocks[i].offsetTop==this.arrOfBlocks[x].offsetTop-(this.arrOfBlocks[x].clientHeight+10)
                                                ){
                                                this.arrOfBlocks[x].classList.add("done");
                                            }
                                        }
                                    }
                                    this.#intervalEnd=true;
                                    break;
                            }
                        }
                    if( this.#intervalEnd ==true ||this.gameBullets.shape.offsetTop<-30 ){
                    clearInterval(id)
                    this.#criticalSection=false;
                    this.#intervalEnd =false;
                    }
                },12);}
            
                    
            }
        }
    }
    moveBlocks(level){
        this.gameBlocks.blokcsCountinr.style.paddingTop="1px";
        let counter=119;
        if(level==1){
            let id=setInterval(() => {
                
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
                if(swal.getState().isOpen){
                    clearInterval(id);
                }else if(this.gameBlocks.blokcsCountinr.clientHeight+this.gameBlocks.blokcsCountinr.offsetTop>=this.gameGun.gunImg.offsetTop){
                    clearInterval(id);
                    gameOver();
                }
            }, 1000);
        }else if(level ==2){
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
    let myCountiner= document.createElement("div");
    myCountiner.classList.add("base");
    document.body.append( myCountiner);
    return myCountiner;
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
        newGame.throwBalls();
        newGame.moveBlocks(level);
        let scoreSpan=document.querySelector(".score");
        let interval=setInterval(() => {
            scoreSpan.innerText=newGame.score;
            if(document.querySelector(".blokcsCountinr").children.length==0){
                winPopUp(newGame.score);
                document.querySelector(".blokcsCountinr").remove();
                clearInterval(interval);
                for(let i=0; i<localStorage.length;i++){
                    if(JSON.parse(localStorage.getItem(localStorage.key(i))).name==name){
                        localStorage.setItem(localStorage.key(i),JSON.stringify({name:name,score:newGame.score}));
                    }
                }
            }
            if(swal.getState().isOpen){
                console.log("lose");
                clearInterval(interval);
                for(let i=0; i<localStorage.length;i++){
                    if(JSON.parse(localStorage.getItem(localStorage.key(i))).name==name){
                        localStorage.setItem(localStorage.key(i),JSON.stringify({name:name,score:newGame.score}));
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
        location.href="../HTML/homePage.html";
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
            location.href="../index.html";
        }else{
            swal("Game Ended").then(()=>{
                location.href="../index.html";
            });
            
        }
    })
}
const CheckLocal=function(value){
    for(let i=0; i<localStorage.length;i++){
        if(JSON.parse(localStorage.getItem(localStorage.key(i))).name==value){
            return true;
        }
    }
    return false;
}


/* 
**************************************************************
  to throw more than one bullet at the same time we can make some changes to the class like following
*************************************************************


// class Bullet
    {
        constructor( countiner,gun){  
            
            this.shape=document.createElement("div");
            this.shape.classList.add("bullet");
            this.baseElemnt=countiner;
            this.shape.style.top=gun.gunImg.style.top; 
            this.shape.style.left=parseInt(gun.gunImg.style.left)+gun.gunImg.width/2+"px"; 
            this.shape.style.visibility="hidden"
            this.baseElemnt.appendChild(this.shape)   
        }
        moving( ){
                let moveInterval=setInterval(() =>
                 {
                    this.shape.style.visibility="visible";
                    this.shape.style.top= parseInt(this.shape.style.top)-5+'px'; 
               
                if( this.shape.offsetTop<-30 ){
                clearInterval(moveInterval);
                 
                }
                },20);}
                check(blocksArray)
                {
                     
                    let checkInterval=setInterval(() =>
                        {
                            for(let i=0;i<blocksArray.length;i++)
                            {
                                if ((blocksArray[i].offsetTop<=  this.shape.offsetTop && blocksArray[i].offsetTop+blocksArray[i].clientHeight>= this.shape.offsetTop) && 
                                (blocksArray[i].offsetLeft-30<= this.shape.offsetLeft &&blocksArray[i].offsetLeft+blocksArray[i].clientWidth >= this.shape.offsetLeft)&&
                                (!blocksArray[i].getAttribute("class").includes("done")))
                                {
                                    blocksArray[i].classList.add("done")
                                    this.shape.remove();
                                    if(blocksArray[i].getAttribute("class").includes("specialItems"))
                                    {
                                        blocksArray[i+1].classList.add("done")
                                        blocksArray[i-1].classList.add("done")
                                        for(let x=0;x<blocksArray.length;x++)
                                        {
                                            if(blocksArray[i].offsetLeft==blocksArray[x].offsetLeft&&blocksArray[i].offsetTop==blocksArray[x].offsetTop+blocksArray[x].clientHeight+10||
                                                blocksArray[i].offsetLeft==blocksArray[x].offsetLeft&&blocksArray[i].offsetTop==blocksArray[x].offsetTop-(blocksArray[x].clientHeight+10)
                                                )
                                                {
                                                blocksArray[x].classList.add("done");
                                                 
                                                }
                                        }
                                    }
                                    
                                    break;
                                }
                                
                                this.checkIntervalEnd=true;
                                
                            }
                            
                        if( this.intervalEnd ==true ||this.shape.offsetTop<-30 ){
                        clearInterval(checkInterval)
                        this.checkIntervalEnd =false;  
                        }
                    },20);
                           
                 }
    } 


// class Game{
            constructor(){
                this.gameGun=new Gun(`./2.png`,elementCountiner);
                this.gameGun.movingWithArrows();
                this.gameBlocks=new Blocks(elementCountiner);
                this.arrOfBlocks=document.querySelectorAll(".blokcItem");
            }
            throwBullets(){

                let gameBullets;
                window.onkeydown=(event)=>{
                    if(event.key==" "){
                        gameBullets=new Bullet(elementCountiner,this.gameGun) ;
                        gameBullets.moving();
                        gameBullets.check(this.arrOfBlocks); 
                         
                }
            }
        }
        
    }

*/