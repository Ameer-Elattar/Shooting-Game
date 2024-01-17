let submitKey=document.querySelector("input[type=submit]");
let localStorageRecord ={};

submitKey.addEventListener("click",function(event)
{
    let userNameInput=document.querySelector("#uName");
    let messageWarn=document.querySelector("p");
    let radioBox=document.querySelectorAll("input[type=radio]")
    if(userNameInput.value==""||!(radioBox[0].checked || radioBox[1].checked))
    {
        event.preventDefault();
        messageWarn.style.visibility="visible";
    }
   
    else{
        messageWarn.style.visibility="hidden";
         if(!(CheckLocal(userNameInput.value)))
            {
                
                localStorageRecord.playername=userNameInput.value;
                window.localStorage.setItem(`Player${localStorage.length +1}`,JSON.stringify(localStorageRecord));
            }
             
            }
            
        
    }
)



