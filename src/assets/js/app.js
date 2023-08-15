const form = document.querySelector('#form')

const API_KEY = '25c15b172c8288ecdf3a5d88c7858bd0'

const cityName = document.querySelector('#city')
const date = document.querySelector('#city small')
const temperature = document.querySelector('#temperature .temp')
const description = document.querySelector('#description')
const icon = document.querySelector('#weather-icon')
const visibility = document.querySelector('#visibility span')
const feelsLike = document.querySelector('#feels-like span')
const humidity = document.querySelector('#humidity span')
const wind = document.querySelector('#wind span')

const showWeatherCard = (arg) => {
  const card = document.querySelector('#weather-card')
  arg ? card.classList.remove('hidden') :
  card.classList.add('hidden')
}

const preLoader = (arg) => {
  const loader = document.querySelector('#loader')
  arg ? loader.classList.remove('hidden') :
  loader.classList.add('hidden')
}

const showError = (arg) => {
  const errorMsg = document.querySelector('#form span')
  arg ? errorMsg.innerText = 'City not found, try again':
  errorMsg.innerText = ''
}

const getWeatherData = async (city) => {
  const apiWaetherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
  const response = await fetch(apiWaetherURL)
  const data = await response.json()

  return data
}

const showWeatherData = async (city) => {
  try {
    const data = await getWeatherData(city)
  
    let visibilityValue = data.visibility
    visibilityValue = visibilityValue.toString().substring(0,2)

    cityName.innerText = `${data.name} - ${data.sys.country}`
    temperature.innerText = parseInt(data.main.temp)
    description.innerHTML = data.weather[0].description
    icon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    humidity.innerText = `${data.main.humidity}%`
    wind.innerText = `${data.wind.speed.toFixed(1)}Km/h`
    feelsLike.innerText = parseInt(data.main.feels_like)
    visibility.innerText = `${visibilityValue}Km`

    showWeatherCard(true)
    showError(false)
    preLoader(false)

  } catch(e){
    showWeatherCard(false)
    showError(true)
    console.log('City not found, try again')
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const inpSearch = document.querySelector('#input-search')
  const city = inpSearch.value

  preLoader(true)
  showWeatherCard(false)
  showWeatherData(city)
})