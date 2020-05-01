/****************************************************************************/
// openweather.com api-url
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}
// 
/****************************************************************************/

const matchInput = async (searchText)=>{
    console.log(searchText);
    const res = await fetch("../data/city.list.json");
    const cityList = await res.json();
    const data = cityList.filter(city=>{
        const regex = new RegExp(`^${searchText}`,'gi');
        return city.name.match(regex) || city.country.match(regex);
    });
    return data[0].id;
}

const form = document.querySelector('#search-form');
const search = document.querySelector('#search');

const getData = async (query,e) =>{
    e.preventDefault();
    const ID = await matchInput(query);
    console.log("making query for : " + ID);
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${ID}&APPID=[api-key]`,{mode:"cors"});
    const data = await res.json();
    console.log(data);  
    displayData(data);
    return data;
}



form.addEventListener('submit',(e)=>getData(search.value,e));
function displayData(data){
    const temp = document.querySelector('#temp');
    temp.innerHTML = `${data.list[0].main.temp}`;

    const windSpeed = document.querySelector('#wind-speed');
    windSpeed.innerHTML = `${data.list[0].wind.speed}`;
    
    const description = document.querySelector('#description');
    description.innerHTML = `${data.list[0].weather[0].description}`;
    
    const date = document.querySelector('#dt_txt');
    date.innerHTML = `${data.list[0].dt_txt}`;

    const sunset = document.querySelector('#sunset');
    sunset.innerHTML = `${new Date(data.city.sunset).toLocaleDateString()}`;
    
    const sunrise = document.querySelector('#sunrise');
    sunrise.innerHTML = `${new Date(data.city.sunrise).toLocaleDateString()}`;
    
    const timezone = document.querySelector('#timezone');
    timezone.innerHTML = `${data.city.timezone}`;
    
    const name = document.querySelector('#name');
    name.innerHTML = `${data.city.name}`;
    
    const humidity = document.querySelector('#humidity');
    humidity.innerHTML = `${data.list[0].main.humidity}`;
    
    const pressure = document.querySelector('#pressure');
    pressure.innerHTML = `${data.list[0].main.pressure}`;
    
    const feels_like = document.querySelector('#feels_like');
    feels_like.innerHTML = `${data.list[0].main.feels_like}`;
}

/******************************************************* */
//usefull extractions from the API data
// //let that be    data     then=>
// data.list[0].dt ==date 
// data.list[0].dt_txt: text format
// data.list[0].weather[0].description ==description
// data.list[0].main.temp
// data.list[0].wind.deg
// data.list[0].wind.speed
// data.city.sunrise
// data.city.sunset
// data.city.timezone
// data.city.name
// data.list[0].main.feels_like
//     .grnd_level
//     .humidity
//     .pressure
//     .sea_level
//     .temp_max
//     .temp_min
/********************************************************* */