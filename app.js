const displatFunc4Get = () => {
    return document.querySelector('.icon').style.display = 'block',
    document.querySelector('.city').style.display = 'block',
    document.querySelector('.temp').style.display = 'block',
    document.querySelector('.feelLike').style.display = 'block',
    document.querySelector('.description').style.display = 'block',
    document.querySelector('.bottom').style.display = 'flex'
}
const displatFunc4NoGet = () => {
    return document.querySelector('.icon').style.display = 'block',
    document.querySelector('.city').style.display = 'block',
    document.querySelector('.bottom').style.display = 'none',
    document.querySelector('.temp').style.display = 'none',
    document.querySelector('.feelLike').style.display = 'none',
    document.querySelector('.description').style.display = 'none'
}


async function getWeather() {
    let city = document.querySelector('input').value;
  if(city.length > 0){
    const apiKey = 'c41bf0d859f17f3bdbf588f53b0b62fd';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    let img = document.querySelector('.icon');
    document.querySelector('.load').style.display = 'block'

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
    document.querySelector('.load').style.display = 'none'
        displatFunc4Get()

        document.querySelector('.city').textContent = data.name
        document.querySelector('.temp').textContent = `${Math.round(data.main.temp - 273.15)}°C`
        document.querySelector('.feelLike').textContent = `Feel Like ${Math.round(data.main.feels_like - 273.15)}°C`
        document.getElementById('humidity').textContent = `${data.main.humidity}%`
        document.querySelector('.description').textContent = `${data.weather[0].description}`
        document.getElementById('wind').textContent = `${data.wind.speed}Km/H`

        switch(data.weather[0].main){
            case 'Clear':
                img.src = './img/clear.png'
                break;
                case 'Clouds':
                    img.src = './img/cloud.png'
                    break;
                    case 'Mist':
                img.src = './img/mist.png'
            break;
            case 'Rain':
                img.src = './img/rain.png'
            break;
            case 'Snow':
                img.src = './img/snow.png'
                break;
            }


    }else {
        document.querySelector('.city').textContent = `"${city}" not found`
        img.src = './img/404.png'
        displatFunc4NoGet()
        document.querySelector('.load').style.display = 'none'
   }
   document.querySelector('input').value = ''
  }else{
      Swal.fire("Value is Empty?");
  }

}

window.addEventListener('keypress', (e) => {
	if(e.key == 'Enter'){
		getWeather()
	}
	document.querySelector('input').focus()
})