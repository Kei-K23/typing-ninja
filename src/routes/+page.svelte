<script lang="ts">
	import { generateRandomText } from '$lib/utils';
	import TextDisplay from '$lib/components/text-display.svelte';
	import Timer from '$lib/components/timer.svelte';

	let gameState = $state({
		isPlaying: false,
		currentText: [] as string[],
		currentWordIndex: 0,
		currentCharIndex: 0,
		userInput: '',
		accuracy: 0,
		wpm: 0,
		errors: 0,
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
		const wordsTyped = gameState.currentWordIndex;
		gameState.wpm = Math.round(wordsTyped / minutes);
	};

	const startGame = () => {
		gameState.currentText = generateRandomText();
		gameState.isPlaying = true;
		gameState.userInput = '';
		gameState.currentWordIndex = 0;
		gameState.currentCharIndex = 0;
		gameState.errors = 0;
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
			currentCharIndex: 0,
			accuracy: 100,
			wpm: 0,
			errors: 0
		};
	};

	function onHandleUserInputKeyDown(e: KeyboardEvent) {
		if (!gameState.isPlaying) return;

		const key = e.key;
		const currentWord = gameState.currentText[gameState.currentWordIndex];

		if (key === ' ') {
			if (gameState.userInput.trim() === currentWord) {
				gameState.currentWordIndex++;
				gameState.currentCharIndex = 0;
				gameState.userInput = '';

				if (gameState.currentWordIndex >= gameState.currentText.length) {
					stopGame();
				}
			} else {
				gameState.errors++;
			}
		} else if (key.length === 1) {
			const expectedChar = currentWord[gameState.currentCharIndex];
			if (key === expectedChar) {
				gameState.currentCharIndex++;
			} else {
				gameState.errors++;
			}
			gameState.userInput += key;
		} else if (key === 'Backspace') {
			if (gameState.currentCharIndex > 0) {
				gameState.currentCharIndex--;
			}
			gameState.userInput = gameState.userInput.slice(0, -1);
		}

		updateAccuracy();
	}

	function updateAccuracy() {
		const totalChars =
			gameState.currentText.slice(0, gameState.currentWordIndex).join(' ').length +
			gameState.currentCharIndex;
		gameState.accuracy = Math.round(((totalChars - gameState.errors) / totalChars) * 100);
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
			currentCharIndex={gameState.currentCharIndex}
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
