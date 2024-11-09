<script lang="ts">
	import { generateRandomText } from '$lib';
	import TextDisplay from '../components/text-display.svelte';
	import { texts } from '../data/text';
	import type { GameState } from '../type';

	let { isPlaying, currentText, userInputText, wpm, accuracy, errors } = $state<GameState>({
		isPlaying: false,
		currentText: '',
		userInputText: '',
		accuracy: 0,
		wpm: 0,
		errors: 0
	});

	const startGame = () => {
		currentText = generateRandomText(texts['beginner']);
		isPlaying = true;
		userInputText = '';
	};
	startGame();
</script>

<main class="h-full bg-zinc-900 pt-10 text-gray-200">
	<div class="mx-auto max-w-4xl">
		<h1 class="text-center text-3xl text-orange-400">Typing Ninja</h1>
		<TextDisplay {currentText} {userInputText} />
	</div>
</main>
