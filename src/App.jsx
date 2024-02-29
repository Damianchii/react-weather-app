import React, { useState } from 'react'
import axios from 'axios'
import {
	TiWeatherCloudy,
	TiWeatherPartlySunny,
	TiWeatherSunny,
	TiWeatherSnow,
	TiWeatherDownpour,
	TiWeatherWindy,
	TiWeatherStormy,
} from 'react-icons/ti'
import { CiSearch } from 'react-icons/ci'
import ForecastCard from './components/ForecastCard'

function App() {
	const [weather, setWeather] = useState({
		coord: { lon: 21.0118, lat: 52.2298 },
		weather: [{ id: 803, main: 'Clouds', description: 'broken clouds', icon: '04n' }],
		base: 'stations',
		main: { temp: 50.35, feels_like: 55.49, temp_min: 276.85, temp_max: 280.17, pressure: 1019, humidity: 74 },
		visibility: 10000,
		wind: { speed: 3.6, deg: 280 },
		clouds: { all: 75 },
		dt: 1707864299,
		sys: { type: 2, id: 2032856, country: 'PL', sunrise: 1707803820, sunset: 1707839013 },
		timezone: 3600,
		id: 756135,
		name: 'Warsaw',
		cod: 200,
	})
	const [location, setLocation] = useState('')
	const [forecast, setForecast] = useState({})

	//KEY
	const apiKey = 'aa38df0ea4e2292097b53c5364a09329'

	//5 days Forecast !IMPRTANT = add &units=imperial to ur url for chage kelvin to fahrenheit
	const urlForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${
		location === '' ? 'Warsaw' : location
	}&units=imperial&appid=${apiKey}`

	//Current weather

	const url = `https://api.openweathermap.org/data/2.5/weather?q=${
		location === '' ? 'Warsaw' : location
	}&units=imperial&appid=${apiKey}`

	const searchLocation = () => {
		axios.get(url).then((response) => {
			setWeather(response.data)
		})
		axios.get(urlForcast).then((response) => {
			setForecast(response.data)
			console.log(response.data)
		})
	}

	const changeIcon = (weather) => {
		switch (weather) {
			case 'Clear':
				return <TiWeatherSunny />
			case 'Clouds':
				return <TiWeatherCloudy />
			case 'Rain':
				return <TiWeatherDownpour />
			case 'Snow':
				return <TiWeatherSnow />
			case 'Mist':
				return <TiWeatherWindy />
			case 'Thunderstorm':
				return <TiWeatherStormy />
			default:
				return <TiWeatherPartlySunny />
		}
	}

	const toCelsius = (fahrenheit) => {
		let celsius = 0
		celsius = (fahrenheit - 32) / 1.8
		return celsius.toFixed()
	}

	const whatDay = (date) => {
		const dayName = new Date(date).getDay()

		switch (dayName) {
			case 0:
				return 'Sunday'
			case 1:
				return 'Monday'
			case 2:
				return 'Tuesday'
			case 3:
				return 'Wednesday'
			case 4:
				return 'Thursday'
			case 5:
				return 'Friday'
			case 6:
				return 'Saturday'
			default:
				return 'day'
		}
	}
	let number = 1

	//Forecast
	let firstNumber = forecast.list && forecast.list[0].dt_txt.slice(8, 10)

	return (
		<div className='main-background font-body flex flex-col gap-6 justify-center items-center '>
			<div className='flex gap-4'>
				<input
					type='text'
					value={location}
					onKeyPress={(event) => (event.key === 'Enter' ? searchLocation() : null)}
					placeholder='Enter Location'
					onChange={(event) => setLocation(event.target.value)}
					className='p-2 px-6 bg-[rgba(0,0,0,0.4)] rounded-3xl focus:bg-[rgba(0,0,0,0.5)] focus:outline-0'
				/>
				<button
					onClick={searchLocation}
					className='w-[40px] h-[40px] bg-slate-900 hover:bg-slate-800 text-white rounded-full grid place-items-center'>
					<CiSearch size={20} />
				</button>
			</div>
			<div className='min-w-[600px]  flex flex-col backdrop-blur-md shadow-custom rounded-xl'>
				<div className='flex items-center justify-center '>
					<div className='flex items-center justify-center'></div>
					<div className='flex flex-col w-full p-4'>
						<div className='flex justify-center items-center w-full'>
							{weather.main && <p className='text-5xl font-[300] p-3 '>{weather.name}</p>}
						</div>
						<div className='flex justify-center items-center gap-10'>
							<p className='text-[70px]'>{changeIcon(weather.weather ? weather.weather[0].main : null)}</p>
							{weather.main && <h1 className='text-[5rem]'>{toCelsius(weather.main.temp)}°C</h1>}
						</div>
						<div className='flex justify-center items-center w-full font-[200]'>
							{weather.main && <h1 className='text-[3rem]'>{weather.weather[0].description}</h1>}
						</div>
					</div>
				</div>

				{weather.name !== undefined && (
					<div className='flex items-center justify-center p-2 py-6 gap-6 '>
						<div className='flex flex-col p-2 px-4 rounded-md bg-[rgba(255,255,255,0.4)] justify-center items-center'>
							<h1 className='font-bold '>Feels Like</h1>
							{weather.main ? <p className='text-2xl font-[200]'>{toCelsius(weather.main.feels_like)}°C</p> : null}
						</div>
						<div className='flex flex-col p-2 px-4 rounded-md bg-[rgba(255,255,255,0.4)] justify-center items-center'>
							<h1 className='font-bold '>Humidity</h1>
							{weather.main ? <p className='text-2xl font-[200]'>{weather.main.humidity}%</p> : null}
						</div>
						<div className='flex flex-col p-2 px-4 rounded-md bg-[rgba(255,255,255,0.4)] justify-center items-center'>
							<h1 className='font-bold '>Wind Speed</h1>
							{weather.wind ? (
								<p className='text-2xl font-[200]'>{(weather.wind.speed * 1.6).toFixed(1)} KM/H</p>
							) : null}
						</div>
					</div>
				)}
				<div className='w-full flex flex-1 p-6'>
					<div className='flex w-full'>
						{forecast.list
							? forecast.list.map((element, key) => {
									firstNumber = '' + firstNumber
									
									if (element.dt_txt.slice(8, 10) === firstNumber) {
										
										if(number === 10){
											firstNumber = 10
										}

										if (firstNumber[0] === '0' && number <= 9) {
											firstNumber = '0' + ++number
										} else {
											firstNumber++
										}

										if (firstNumber === 30) {
											firstNumber = '0' + number
										}

										return (
											<ForecastCard
												key={key}
												icon={changeIcon(element.weather[0].main)}
												temperature={toCelsius(element.main.temp)}
												day={whatDay(element.dt_txt.slice(0, 10))}
											/>
										)
									} else {
										return
									}
							  })
							: null}
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
