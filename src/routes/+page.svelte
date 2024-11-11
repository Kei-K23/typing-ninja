<script lang="ts">
	import { generateRandomText } from '$lib/utils';
	import TextDisplay from '$lib/features/home/components/text-display.svelte';
	import Timer from '$lib/features/home/components/timer.svelte';
	import type { GameState } from '../type';
	import Result from '$lib/features/result/components/result.svelte';

	let gameStates = $state<GameState>({
		isPlaying: false,
		isFinish: false,
		currentText: [],
		currentWordIndex: 0,
		userInput: [],
		accuracy: 100,
		wpm: 0,
		correctChars: 0,
		totalChars: 0,
		timeElapsed: 0
	});

	let timerInterval = $state(0);

	const startTimer = () => {
		timerInterval = setInterval(() => {
			gameStates.timeElapsed++;
			updateWPM();
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(timerInterval);
	};

	const resetTimer = () => {
		gameStates.timeElapsed = 0;
		clearInterval(timerInterval);
	};

	const updateWPM = () => {
		const minutes = gameStates.timeElapsed / 60;
		const wordsTyped = gameStates.correctChars / 5; // Assuming average word length of 5 characters
		gameStates.wpm = Math.round(wordsTyped / minutes);
	};

	const startGame = () => {
		gameStates.currentText = generateRandomText();
		gameStates.isPlaying = true;
		gameStates.isFinish = false;
		gameStates.userInput = gameStates.currentText.map(() => '');
		gameStates.currentWordIndex = 0;
		gameStates.correctChars = 0;
		gameStates.totalChars = 0;
		gameStates.accuracy = 100;
		gameStates.timeElapsed = 0;
		startTimer();
	};

	const stopGame = () => {
		gameStates.isPlaying = false;
		gameStates.isFinish = true;
		stopTimer();
	};

	const resetGame = () => {
		stopGame();
		resetTimer();
		gameStates = {
			...gameStates,
			userInput: [],
			isPlaying: false,
			currentWordIndex: 0,
			accuracy: 100,
			wpm: 0,
			correctChars: 0,
			totalChars: 0
		};
	};

	// TODO : Handle and prevent not to move to previous word, when previous work is already correct
	function onHandleUserInputKeyDown(e: KeyboardEvent) {
		if (!gameStates.isPlaying) return;

		const key = e.key;
		const currentWord = gameStates.currentText[gameStates.currentWordIndex];
		let currentInput = gameStates.userInput[gameStates.currentWordIndex];

		if (key === ' ') {
			// Move to next word, preserving incorrect characters
			if (gameStates.currentWordIndex < gameStates.currentText.length - 1) {
				gameStates.currentWordIndex++;
			} else {
				// Stop the game here
				stopGame();
			}
		} else if (key.length === 1) {
			// Add character to user input
			currentInput += key;
			gameStates.userInput[gameStates.currentWordIndex] = currentInput;
			gameStates.totalChars++;

			// Check if the character is correct
			if (
				currentInput.length <= currentWord.length &&
				key === currentWord[currentInput.length - 1]
			) {
				gameStates.correctChars++;
			}
		} else if (key === 'Backspace') {
			// Remove last character from user input
			if (currentInput.length > 0) {
				const lastChar = currentInput[currentInput.length - 1];
				const expectedChar = currentWord[currentInput.length - 1];

				currentInput = currentInput.slice(0, -1);
				gameStates.userInput[gameStates.currentWordIndex] = currentInput;
				gameStates.totalChars--;

				if (lastChar === expectedChar) {
					gameStates.correctChars--;
				}
			} else if (gameStates.currentWordIndex > 0) {
				// Move to previous word
				gameStates.currentWordIndex--;
			}
		}

		updateAccuracy();
	}

	function updateAccuracy() {
		gameStates.accuracy =
			Math.round((gameStates.correctChars / gameStates.totalChars) * 100) || 100;
	}
	// Initialize the game
	startGame();
</script>

<main class="flex h-full bg-zinc-800 pt-10 font-mono text-gray-200">
	{#if !gameStates.isFinish}
		<div class="mx-auto mt-36 max-w-6xl">
			<Timer timeElapsed={gameStates.timeElapsed} {timerInterval} />
			<TextDisplay
				currentText={gameStates.currentText}
				userInput={gameStates.userInput}
				currentWordIndex={gameStates.currentWordIndex}
			/>
		</div>
	{:else}
		<Result {startGame} {gameStates} {timerInterval} />
	{/if}
</main>

<svelte:window on:keydown|preventDefault={onHandleUserInputKeyDown} />
