// auto focus on input in load
const firstInput = document.querySelector(".inputs input:first-child");
window.onload = ()=>{
    firstInput.focus();
};
const inputs = Array.from(document.querySelectorAll("input"));
const title = document.querySelector(".title");
let password = [];
// ---------------auto tab between inputs---------------------
inputs.forEach((element, index)=>{
    element.addEventListener("input",(event)=>{
        if(event.target.value.length>0 & index < inputs.length-1){
            moveToNext(element);
            password.push(event.target.value)
        }else if(index == inputs.length - 1){
            //when we finish we check if password true we resolve if not we reject
            password.join("")=="1234" ? title.innerHTML = "Correct Pin" : title.innerHTML = "Incorrect Pin";
            element.blur();
            password.push(event.target.value)
        }else if(event.inputType == "deleteContentBackward" & index > 0) {
            moveToPrevious(element);
            password.pop();
        }else {
            element.blur();
            password.pop();
        }
    });
});
// ---------------------auto tab when pasting a password---------------------
firstInput.addEventListener("paste", (e)=>{
    let copiedData = e.clipboardData.getData("text");
    inputs.forEach((element, index)=>{
        element.value = copiedData[index];
        element.blur()
    });
    if(e.clipboardData.getData("text")=="1234"){
        title.innerHTML = "Correct Pin";
    }else{
        title.innerHTML = "Incorrect Pin";
    }
});
// ------------------------------------------------------------------------------------------------
function moveToNext(element){
    element.blur();
    element.nextElementSibling.focus();
}
function moveToPrevious(element){
    element.blur();
    element.previousElementSibling.focus();
}