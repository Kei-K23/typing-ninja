<script lang="ts">
	import { generateRandomText } from '$lib/utils';
	import TextDisplay from '$lib/components/text-display.svelte';
	import Timer from '$lib/components/timer.svelte';

	let gameState = $state({
		isPlaying: false,
		currentText: [] as string[],
		currentWordIndex: 0,
		userInput: '',
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
		gameState.userInput = '';
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
			userInput: '',
			currentWordIndex: 0,
			accuracy: 100,
			wpm: 0,
			correctChars: 0,
			totalChars: 0
		};
	};

	function onHandleUserInputKeyDown(e: KeyboardEvent) {
		if (!gameState.isPlaying) return;

		const key = e.key;
		const currentWord = gameState.currentText[gameState.currentWordIndex];

		if (key === ' ') {
			// Move to next word regardless of correctness
			gameState.currentWordIndex++;
			gameState.userInput = '';

			if (gameState.currentWordIndex >= gameState.currentText.length) {
				stopGame();
			}
		} else if (key.length === 1) {
			// Add character to user input
			gameState.userInput += key;
			gameState.totalChars++;

			// Check if the character is correct
			if (
				gameState.userInput.length <= currentWord.length &&
				key === currentWord[gameState.userInput.length - 1]
			) {
				gameState.correctChars++;
			}
		} else if (key === 'Backspace') {
			// Remove last character from user input
			if (gameState.userInput.length > 0) {
				const lastChar = gameState.userInput[gameState.userInput.length - 1];
				const expectedChar = currentWord[gameState.userInput.length - 1];

				gameState.userInput = gameState.userInput.slice(0, -1);
				gameState.totalChars--;

				if (lastChar === expectedChar) {
					gameState.correctChars--;
				}
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

<main class="h-full bg-zinc-900 pt-10 text-gray-200">
	<div class="mx-auto max-w-4xl">
		<h1 class="text-center text-3xl text-orange-400">Typing Ninja</h1>
		<Timer timeElapsed={gameState.timeElapsed} {timerInterval} />
		<TextDisplay
			currentText={gameState.currentText}
			userInput={gameState.userInput}
			currentWordIndex={gameState.currentWordIndex}
		/>
		<div class="mt-4 flex justify-center space-x-4">
			<button class="rounded bg-orange-500 px-4 py-2 text-white" onclick={startGame}>Start</button>
			<button class="rounded bg-red-500 px-4 py-2 text-white" onclick={stopGame}>Stop</button>
			<button class="rounded bg-blue-500 px-4 py-2 text-white" onclick={resetGame}>Reset</button>
		</div>
		<div class="mt-4 text-center">
			<p>WPM: {gameState.wpm}</p>
			<p>Accuracy: {gameState.accuracy}%</p>
		</div>
	</div>
</main>

<svelte:window on:keydown|preventDefault={onHandleUserInputKeyDown} />
