const commonWords = [
	'the',
	'be',
	'to',
	'of',
	'and',
	'a',
	'in',
	'that',
	'have',
	'I',
	'it',
	'for',
	'not',
	'on',
	'with',
	'he',
	'as',
	'you',
	'do',
	'at',
	'this',
	'but',
	'his',
	'by',
	'from',
	'they',
	'we',
	'say',
	'her',
	'she'
];

export const generateRandomText = (count: number = 10) => {
	return Array.from(
		{ length: count },
		() => commonWords[Math.floor(Math.random() * commonWords.length)]
	);
};
