export type GameState = {
	isPlaying: boolean;
	currentText: string[];
	userInputText: string;
	currentIndex: number;
	wpm: number;
	accuracy: number;
	errors: number;
	timeElapsed: number;
};
