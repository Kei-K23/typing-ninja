import { commonWords } from '$lib/data';

export const generateRandomText = (count: number = 25) => {
	return Array.from(
		{ length: count },
		() => commonWords[Math.floor(Math.random() * commonWords.length)]
	);
};
