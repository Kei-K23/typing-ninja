export type GameState = {
	isPlaying: boolean;
	isFinish: boolean;
	isPending: boolean;
	currentText: string[];
	currentWordIndex: number;
	userInput: string[];
	accuracy: number;
	wpm: number;
	correctChars: number;
	totalChars: number;
	timeElapsed: number;
	totalGenerateWords: number;
};
