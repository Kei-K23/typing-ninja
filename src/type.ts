export type GameState = {
	isPlaying: boolean;
	isFinish: boolean;
	isPending: boolean;
	isShowKeyboard: boolean;
	currentText: string[];
	currentWordIndex: number;
	userInput: string[];
	accuracy: number;
	wpm: number;
	correctChars: number;
	totalChars: number;
	timeElapsed: number;
	timeElapsedMode: number;
	totalGenerateWords: number;
	mode: 'time' | 'words';
};
