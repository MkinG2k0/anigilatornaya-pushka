export const generateNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min) + min)
}
