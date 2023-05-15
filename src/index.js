const myForm = document.getElementById('ip_form');
const formInput = document.getElementById('search_bar');
myForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    let ipValue = ipValidation(formInput.value);
    if(ipValue){
        // alert("IP correct!");
        console.log(ipValue);
        myForm.action = "https://geo.ipify.org/api/v2/country?apiKey=at_1IvFdGcCCSs7jsfZTZlbmUTMtGeXG&ipAddress=" + ipValue;
        console.log(myForm.action);
    } else {
        alert("IP not valid!");
    }
    // domainValidation();
});


function ipValidation(ip){
    let ipValues =  ip.replace(/\s/g, "").split('.');
    console.log(ipValues);
    if(ipValues.length === 4 && ipValues.every(isIpValue)){
        return ipValues.join(".");
    } else {
        return 0;
    }
}

function isIpValue(element){
    let elementNumber = +element;
    console.log(typeof elementNumber);
    console.log(elementNumber);
    return !(isNaN(elementNumber)) && elementNumber >= 0 && elementNumber <= 255; 
}

function domainValidation(domain){
    return false;
}