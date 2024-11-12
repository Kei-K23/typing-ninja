export const commonWords = [
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
	'she',
	'or',
	'an',
	'will',
	'my',
	'one',
	'all',
	'would',
	'there',
	'their',
	'what',
	'so',
	'up',
	'out',
	'if',
	'about',
	'who',
	'get',
	'which',
	'go',
	'me',
	'when',
	'make',
	'can',
	'like',
	'no',
	'just',
	'him',
	'know',
	'take',
	'into',
	'your',
	'good',
	'some',
	'could',
	'them',
	'see',
	'other',
	'than',
	'then',
	'now',
	'look',
	'only',
	'come',
	'its',
	'over',
	'think',
	'also',
	'back',
	'after',
	'use',
	'two',
	'how',
	'our',
	'work',
	'first',
	'well',
	'way',
	'even',
	'new',
	'want',
	'because',
	'any',
	'these',
	'give',
	'day',
	'most',
	'us',
	'is',
	'more',
	'where',
	'where?',
	'need',
	'while',
	'might',
	'might.',
	'must',
	'right',
	'around',
	'around,',
	'year',
	'still',
	'still!',
	'many',
	'same',
	'long',
	'small',
	'small,',
	'great',
	'much',
	'big',
	'big.',
	'old',
	'high',
	'such',
	'call',
	'call.',
	'try',
	'own',
	'own,',
	'off',
	'again',
	'again,',
	'left',
	'end',
	'few',
	'few.',
	'place',
	'keep',
	'part',
	'let',
	'let.',
	'set',
	'put',
	'help',
	'help,',
	'home',
	'another',
	'point',
	'point?',
	'show',
	'play',
	'start',
	'run',
	'move',
	'live',
	'mean',
	'tell',
	'turn',
	'feel',
	'hope',
	'change',
	'mind',
	'close',
	'step',
	'watch',
	'walk',
	'open',
	'team',
	'face',
	'kind',
	'past',
	'stop',
	'stop!',
	'hard',
	'face',
	'together.',
	'together',
	'ready.',
	'ready',
	'soon',
	'soon.',
	'sound',
	'sound.',
	'thought',
	'long',
	'small',
	'big',
	'large',
	'full',
	'under',
	'above.',
	'above',
	'before',
	'before,',
	'after',
	'front',
	'clear',
	'clear.',
	'strong',
	'cool',
	'warm',
	'warm.',
	'free',
	'space',
	'world',
	'world.',
	'world.',
	'light',
	'near',
	'near.',
	'far',
	'deep',
	'deep.',
	'dark',
	'easy',
	'fast',
	'slow',
	'young.',
	'large',
	'quick',
	'quick.',
	'fun',
	'energy',
	'break.',
	'break',
	'dream',
	'truth',
	'idea.',
	'idea',
	'right',
	'left'
];

export type Theme = {
	name: string;
	backgroundColor: string;
	accentBackgroundColor: string;
	accentBorderColor: string;
	opacityAccentBackgroundColor: string;
	textColor: string;
	accentTextColor: string;
	accentColor: string;
	accentBgColor: string;
};

export const themes: Theme[] = [
	{
		name: 'Default',
		backgroundColor: 'bg-zinc-800',
		accentBackgroundColor: 'bg-zinc-700',
		accentBorderColor: 'border-zinc-700',
		opacityAccentBackgroundColor: 'bg-zinc-700/60',
		textColor: 'text-gray-200',
		accentTextColor: 'text-gray-100',
		accentColor: 'text-yellow-500',
		accentBgColor: 'bg-yellow-500/40'
	},
	{
		name: 'Light',
		backgroundColor: 'bg-gray-200',
		accentBackgroundColor: 'bg-gray-100',
		accentBorderColor: 'border-gray-100',
		opacityAccentBackgroundColor: 'bg-gray-100/60',
		textColor: 'text-gray-800',
		accentTextColor: 'text-gray-700',
		accentColor: 'text-blue-600',
		accentBgColor: 'bg-blue-600/40'
	},
	{
		name: 'Dark Blue',
		backgroundColor: 'bg-blue-900',
		accentBackgroundColor: 'bg-blue-800',
		accentBorderColor: 'border-blue-800',
		opacityAccentBackgroundColor: 'bg-blue-800/60',
		textColor: 'text-gray-200',
		accentTextColor: 'text-gray-100',
		accentColor: 'text-yellow-400',
		accentBgColor: 'bg-yellow-400/60'
	},
	{
		name: 'Forest',
		backgroundColor: 'bg-green-900',
		accentBackgroundColor: 'bg-green-800',
		accentBorderColor: 'border-green-800',
		opacityAccentBackgroundColor: 'bg-green-800/60',
		textColor: 'text-emerald-200',
		accentTextColor: 'text-emerald-100',
		accentColor: 'text-yellow-300',
		accentBgColor: 'bg-yellow-300/40'
	}
];
