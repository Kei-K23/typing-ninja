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

	function onKeyDown(e: KeyboardEvent) {
		// Return and exist the key down event when not playing
		// This is only solution I found to stop keyboard event in Svelte :)
		if (!isPlaying) return;

		console.log(e.key);
	}

	// Init the game
	startGame();
</script>

<main class="h-full bg-zinc-900 pt-10 text-gray-200">
	<div class="mx-auto max-w-4xl">
		<h1 class="text-center text-3xl text-orange-400">Typing Ninja</h1>
		<Timer {timeElapsed} {timerInterval} />
		<TextDisplay {currentText} {userInputText} />
		<button onclick={stopGame}>Stop</button>
	</div>
</main>

<svelte:window on:keydown|preventDefault={onKeyDown} />
