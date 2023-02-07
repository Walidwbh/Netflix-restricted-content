const inputs = Array.from(document.querySelectorAll("input"));
let password = [];
new Promise((resolve, reject)=>{
inputs.forEach((element, index)=>{
    element.addEventListener("input",(event)=>{
        if(event.target.value.length>0 & index < inputs.length-1){
            event.target.blur();
            element.nextElementSibling.focus();
            password.push(event.target.value)
        }else if(index == inputs.length - 1){
            event.target.blur();
            password.push(event.target.value)
            //when we finish we check if password true we resolve if not we reject
            if(password.join("")=="1234"){
                resolve();
            }else{
                reject()
            }
        }else if(event.inputType == "deleteContentBackward" & index > 0) {
            event.target.blur();
            element.previousElementSibling.focus();
            password.pop()
        }else {
            event.target.blur();
            password.pop()
        }
    });
})}).then(()=>{
    let i = 5;
    let interval = setInterval((e)=>{
        i--;
        document.querySelector(".pin .title").textContent=`Correct PIN, Please wait ${i} seconds to be redirected`;
        if(i == 0 ){
            clearInterval(interval);
            document.querySelector(".pin").style.display = "none";
            document.getElementById("background").classList.remove("background");
        }
    },1000);
}).catch(()=>{
    document.querySelector(".pin .title").textContent="Incorrect PIN. Please try again.";
    inputs.forEach((e)=>{
        e.value = ""
    });
    inputs[0].focus();
})
