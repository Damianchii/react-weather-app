/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			body: ['Outfit', 'sans-serif'],
		},
		extend: {
			boxShadow: {
				custom: 'rgba(0, 0, 0, 0.35) 0px 5px 15px;',
			},
		},
	},
	plugins: [],
}
