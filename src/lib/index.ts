// Generate random text for different level
export const generateRandomText = (texts: string[]) => {
	const randomIndex = Math.floor(Math.random() * texts.length);
	return texts[randomIndex];
};
