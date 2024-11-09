<script lang="ts">
	import { texts } from '../data/text';
	import type { GameState } from '../type';
	import { generateRandomText } from '$lib/components/utils';
	import TextDisplay from '$lib/components/text-display.svelte';
	import Timer from '$lib/components/timer.svelte';

	let { isPlaying, currentText, userInputText, wpm, accuracy, errors } = $state<GameState>({
		isPlaying: false,
		currentText: '',
		userInputText: '',
		accuracy: 0,
		wpm: 0,
		errors: 0
	});
	let timeElapsed = $state(0);
	let timerInterval = $state(0); // Timer interval to clear timer

	export const startTimer = () => {
		timerInterval = setInterval(() => {
			timeElapsed++;
		}, 1000);
	};

	export const stopTimer = () => {
		clearInterval(timerInterval);
	};

	export const resetTimer = () => {
		timeElapsed = 0;
		clearInterval(timerInterval);
	};

	// Start the game state
	const startGame = () => {
		currentText = generateRandomText(texts['beginner']);
		isPlaying = true;
		userInputText = '';
		startTimer();
	};

	const stopGame = () => {
		isPlaying = false;
		stopTimer();
	};

	const resetGame = () => {
		userInputText = '';
		accuracy = 0;
		wpm = 0;
		errors = 0;
		resetTimer();
		isPlaying = false;
	};

	function onHandleUserInputKeyDown(e: KeyboardEvent) {
		// Return if the game is not playing
		if (!isPlaying) return;

		// Detect the actual character typed, handling Shift and other modifier keys
		let inputChar = e.key;

		// If the key is a single character (letters, numbers, symbols), handle case mapping
		if (inputChar.length === 1) {
			// If Shift is held, keep the character as uppercase; otherwise, make it match the actual intended case
			if (!e.shiftKey) {
				inputChar = inputChar.toLowerCase();
			}
			// Append the character to user input
			userInputText += inputChar;

			// Update accuracy and errors
			const targetChar = currentText[userInputText.length - 1];
			if (inputChar === targetChar) {
				// Correct input, no action needed
			} else {
				// Increment errors if the character doesn't match
				errors++;
			}

			// Check if user has completed the text
			if (userInputText.length === currentText.length) {
				stopGame();
			}
		}

		// If the key is "Backspace", allow deletion from user input
		if (e.key === 'Backspace') {
			userInputText = userInputText.slice(0, -1);
		}
	}

	// Init the game
	startGame();
	$inspect(userInputText);
	$effect(() => {
		if (currentText.trim() === userInputText.trim()) {
			stopGame();
		}
	});
</script>

<main class="h-full bg-zinc-900 pt-10 text-gray-200">
	<div class="mx-auto max-w-4xl">
		<h1 class="text-center text-3xl text-orange-400">Typing Ninja</h1>
		<Timer {timeElapsed} {timerInterval} />
		<TextDisplay {currentText} {userInputText} />
		<button onclick={stopGame}>Stop</button>
	</div>
</main>

<svelte:window on:keydown|preventDefault={onHandleUserInputKeyDown} />
