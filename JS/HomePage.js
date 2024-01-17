let userNameInput=document.querySelector("#uName");
let submitKey=document.querySelector("input[type=submit]");
let messageWarn=document.querySelector("p");
let radioBox=document.querySelectorAll("input[type=radio]")
let localStorageRecord ={};

submitKey.addEventListener("click",function(event,userInput,Warn,radioBoxCheck)
{
    if(userInput.value==""||!(radioBoxCheck[0].checked || radioBoxCheck[1].checked))
    {
        event.preventDefault();
        Warn.style.visibility="visible";
    }
   
    else{
        Warn.style.visibility="hidden";
         if(!(CheckLocal(userInput.value)))
            {
                
                localStorageRecord.playername=userInput.value;
                console.log(localStorageRecord.playername)
                window.localStorage.setItem(`Player${localStorage.length +1}`,JSON.stringify(localStorageRecord));
            }
             
            }
            
        
    }
)



