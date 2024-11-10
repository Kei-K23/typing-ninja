<script lang="ts">
	import { generateRandomText } from '$lib/utils';
	import TextDisplay from '$lib/components/text-display.svelte';
	import Timer from '$lib/components/timer.svelte';

	let gameState = $state({
		isPlaying: false,
		currentText: [] as string[],
		currentWordIndex: 0,
		userInput: [] as string[],
		accuracy: 100,
		wpm: 0,
		correctChars: 0,
		totalChars: 0,
		timeElapsed: 0
	});

	let timerInterval = $state(0);

	const startTimer = () => {
		timerInterval = setInterval(() => {
			gameState.timeElapsed++;
			updateWPM();
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(timerInterval);
	};

	const resetTimer = () => {
		gameState.timeElapsed = 0;
		clearInterval(timerInterval);
	};

	const updateWPM = () => {
		const minutes = gameState.timeElapsed / 60;
		const wordsTyped = gameState.correctChars / 5; // Assuming average word length of 5 characters
		gameState.wpm = Math.round(wordsTyped / minutes);
	};

	const startGame = () => {
		gameState.currentText = generateRandomText();
		gameState.isPlaying = true;
		gameState.userInput = gameState.currentText.map(() => '');
		gameState.currentWordIndex = 0;
		gameState.correctChars = 0;
		gameState.totalChars = 0;
		gameState.accuracy = 100;
		startTimer();
	};

	const stopGame = () => {
		gameState.isPlaying = false;
		stopTimer();
	};

	const resetGame = () => {
		stopGame();
		resetTimer();
		gameState = {
			...gameState,
			userInput: [],
			currentWordIndex: 0,
			accuracy: 100,
			wpm: 0,
			correctChars: 0,
			totalChars: 0
		};
	};

	// TODO : Handle and prevent not to move to previous word, when previous work is already correct
	function onHandleUserInputKeyDown(e: KeyboardEvent) {
		if (!gameState.isPlaying) return;

		const key = e.key;
		const currentWord = gameState.currentText[gameState.currentWordIndex];
		let currentInput = gameState.userInput[gameState.currentWordIndex];

		if (key === ' ') {
			// Move to next word, preserving incorrect characters
			if (gameState.currentWordIndex < gameState.currentText.length - 1) {
				gameState.currentWordIndex++;
			} else {
				// Stop the game here
				stopGame();
			}
		} else if (key.length === 1) {
			// Add character to user input
			currentInput += key;
			gameState.userInput[gameState.currentWordIndex] = currentInput;
			gameState.totalChars++;

			// Check if the character is correct
			if (
				currentInput.length <= currentWord.length &&
				key === currentWord[currentInput.length - 1]
			) {
				gameState.correctChars++;
			}
		} else if (key === 'Backspace') {
			// Remove last character from user input
			if (currentInput.length > 0) {
				const lastChar = currentInput[currentInput.length - 1];
				const expectedChar = currentWord[currentInput.length - 1];

				currentInput = currentInput.slice(0, -1);
				gameState.userInput[gameState.currentWordIndex] = currentInput;
				gameState.totalChars--;

				if (lastChar === expectedChar) {
					gameState.correctChars--;
				}
			} else if (gameState.currentWordIndex > 0) {
				// Move to previous word
				gameState.currentWordIndex--;
			}
		}

		updateAccuracy();
	}

	function updateAccuracy() {
		gameState.accuracy = Math.round((gameState.correctChars / gameState.totalChars) * 100) || 100;
	}
	// Initialize the game
	startGame();
</script>

<main class="flex h-full bg-zinc-800 pt-10 text-gray-200">
	<div class="mx-auto mt-36 max-w-5xl">
		<Timer timeElapsed={gameState.timeElapsed} {timerInterval} />
		<TextDisplay
			currentText={gameState.currentText}
			userInput={gameState.userInput}
			currentWordIndex={gameState.currentWordIndex}
		/>
	</div>
</main>

<svelte:window on:keydown|preventDefault={onHandleUserInputKeyDown} />
