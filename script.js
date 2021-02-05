const search = document.getElementById('search');


location_hadle();


search.addEventListener('click', function() {
    weather();
})


function weather() {
    const inputValue = document.getElementById('customInput')
    handle_fetch(inputValue.value);
    
}


// api .this is about gps 
function location_hadle(){
   fetch('https://freegeoip.app/json/')
    .then(response=> response.json())
    .then(data=>{

     const yourLocation = data.region_name
     const countryName = data.country_name
     const timeZone= data.time_zone
       document.getElementById('location').innerText = yourLocation;
       document.getElementById('timeZone').innerText = timeZone;
       document.getElementById('countryName').innerText = countryName;


        if(yourLocation !== ""){
        document.getElementById('customInput').placeholder =yourLocation;
        document.getElementById('location').innerText = yourLocation;
        handle_fetch(yourLocation);
        }else{
               document.getElementById('customInput').placeholder =countryName;
               document.getElementById('location').innerText = "Maybe Your are using VPN.";
                handle_fetch(countryName);
        }
        
    })
 
}
    

// Api handle from here


function handle_fetch(presentLocation){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+presentLocation+'&units=metric&appid=61d2ad6f0b7758a658fa5e7db897fd42 ')
        .then(response => response.json())
        .then(data=>{
            const cityName = data.name
            const cityTemp = data.main
            const temp = cityTemp.temp
            const weather = data.weather[0]
            const description = weather.description
            let icon = weather.icon
            const link ="http://openweathermap.org/img/w/"+icon+".png"
            
            document.getElementById("myImg").src = link
            document.getElementById('cityName').innerText = cityName;
            document.getElementById('temp').innerText = temp;
            document.getElementById('description').innerText = description;

        })
}