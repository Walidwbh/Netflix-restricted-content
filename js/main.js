const inputs = Array.from(document.querySelectorAll("input"));
let password = "";
new Promise((resolve, reject)=>{
inputs.forEach((element)=>{
    element.addEventListener("input",(event)=>{
        password+=event.target.value;
        if(event.target.value.length>0 & element.nextElementSibling!=null){
            event.target.blur();
            element.nextElementSibling.focus();
        }else{
            event.target.blur();
            resolve();
        }
    });
})}).then(()=>{
    if(password!=="1234"){
        document.querySelector(".pin .title").textContent="Incorrect PIN. Please try again.";
    }
})
