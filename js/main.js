// auto focus on input in load
const firstInput = document.querySelector(".inputs input:first-child");
window.onload = ()=>{
    firstInput.focus();
};
const inputs = Array.from(document.querySelectorAll("input"));
let password = [];
// auto tab between inputs
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
                correctPin()
            }else{
                inCorrectPin()
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
});
// auto tab when pasting a password
firstInput.addEventListener("paste", (e)=>{
    let copiedData = e.clipboardData.getData("text");
    inputs.forEach((element, index)=>{
        element.value = copiedData[index];
        element.blur()
    })
    // console.log(e.clipboardData.getData("text"))
    if(e.clipboardData.getData("text")=="1234"){
        correctPin()
    }else{
        inCorrectPin()
    }
});
function correctPin(){
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
}
function inCorrectPin(){
    let i = 5;
    let interval = setInterval((e)=>{
        i--;
        document.querySelector(".pin .title").textContent=`Incorrect PIN. Please try again after ${i}`;
        if(i == 0 ){
            clearInterval(interval);
            location.reload()
        }
    },1000);
}