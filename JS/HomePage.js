let playerName=document.querySelector("#uName");
let submitKey=document.querySelector("input[type=submit]");
let messageWarn=document.querySelector("p");
let radioBox=document.querySelectorAll("input[type=radio]")
let localStorageRecord;
localStorageRecord={
    name:""
}
localStorage.setItem("PlayerTest",JSON.stringify(localStorageRecord));
submitKey.addEventListener("click",function(event){
    if(playerName.value==""){
        event.preventDefault();
        messageWarn.style.visibility="visible";
    }else if(!(radioBox[0].checked || radioBox[1].checked)){
        event.preventDefault();
        messageWarn.style.visibility="visible";
    }
    else{
        messageWarn.style.visibility="hidden";
            if(!(CheckLocal(playerName.value))){
                localStorageRecord.name=playerName.value;
                window.localStorage.setItem(`Player${localStorage.length +1}`,JSON.stringify(localStorageRecord));
            }
            
        
    }
})



