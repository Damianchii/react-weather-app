const ForecastCard = ({ icon, temperature, day }) => {
	return (
		<div className='flex flex-col justify-center items-center flex-1 '>
			<p className='text-[50px]'>{icon}</p>

			<p className='text-2xl border-b p-1'>{temperature}°C</p>

			<h1 className='text-2xl font-[200] py-2'>{day}</h1>
		</div>
	)
}

export default ForecastCard
