const input=document.getElementById("input");
const searchBtn=document.getElementById("search-btn");

searchBtn.addEventListener("click",async (e)=>{
    e.preventDefault();
    if (input.value=="") {
        alert("Please Enter a City Name");
    }else{
        try {
            let location=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q={${input.value}}&appid=e65206c55b9eb4d16453571c7534b9a3
            `);
            location=await location.json();
            let lat=location[0].lat;
            let lon=location[0].lon;

            let weatherApi=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e65206c55b9eb4d16453571c7534b9a3`)
            
            weatherApi=await weatherApi.json();
            console.log(weatherApi);
            if (weatherApi.cod==200) {
                let area=`<div class="area">
                <img src="http://openweathermap.org/img/w/${weatherApi.weather[0].icon}.png" alt="">
                <h3>${Math.round(weatherApi.main.temp - 273)} <sup>o</sup> C</h3>
                <h2>${weatherApi.name}</h2>
                <div class="box-footer">
                    <div>
                        <i class="fa-solid fa-water"></i>
                        <h4>${weatherApi.main.humidity}%</h4>
                        <p>Humidity</p>
                    </div>
                    <div>
                        <i class="fa-solid fa-wind"></i>
                        <h4>${weatherApi.wind.speed}km/h</h4>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>`;
            document.querySelector(".box").insertAdjacentHTML("beforeend",area);
            }
        } catch (error) {
            console.log(error);
        }
    }
})