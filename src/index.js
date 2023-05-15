const myForm = document.getElementById('ip_form');
const formInput = document.getElementById('search_bar');
const ipAddressValue = document.querySelector('.ip-address-value');
const ipLocationValue = document.querySelector('.ip-location-value');
const ipTimeZoneValue = document.querySelector('.ip-time-zone-value');
const ipIspValue = document.querySelector('.ip-isp-value');

const map = L.map('map').setView([37.40599, -122.078514], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let marker = L.marker([37.40599, -122.078514]).addTo(map);

myForm.addEventListener('submit', async (e) =>{
    e.preventDefault();
    let ipValue = ipValidation(formInput.value);
    if(ipValue){
        myForm.action = "https://geo.ipify.org/api/v2/country,city?apiKey=at_1IvFdGcCCSs7jsfZTZlbmUTMtGeXG&ipAddress=" + ipValue;
        let ip = "";
        let location = "";
        let timezone = "";
        let isp = "";
        let lat = "";
        let lng = "";
        await fetch(myForm.action, {
            method: "GET",
        })
            .then(res => res.json())
            .then(res => {              
                ip = res.ip;            
                location = res.location.region + ", " + res.location.country + " " + res.location.postalCode;    
                timezone = res.location.timezone;
                isp = res.isp;
                lat = res.location.lat;
                lng = res.location.lng;
            });

        /*temp*/
        // ip = "151.60.79.68";
        // location = "Turin, IT";
        // timezone = "UTC-2:00";
        // isp = "Wind Italia";
        // lat = 51.505;
        // lng = -0.09;

        ipAddressValue.firstChild.data = ip;
        ipLocationValue.firstChild.data = location;
        ipTimeZoneValue.firstChild.data = timezone;
        ipIspValue.firstChild.data = isp;

        // setting up the map
        // TODO REMOVE OTHER MARKER??
        let zoomLevel = 13;
        map.setView([lat, lng], zoomLevel);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        let marker = L.marker([lat, lng]).addTo(map);

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
    return !(isNaN(elementNumber)) && elementNumber >= 0 && elementNumber <= 255; 
}

function domainValidation(domain){
    return false;
}
