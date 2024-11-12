<script lang="ts">
	import { generateRandomText } from '$lib/utils';
	import type { GameState } from '../../../../type';

	interface Props {
		gameStates: GameState;
	}

	let { gameStates = $bindable() }: Props = $props();

	// State for filters and current selection
	let filter = $state({
		words: {
			filters: [10, 25, 50, 100, 200]
		},
		time: {
			filters: [15, 30, 60, 120, 130]
		}
	});

	function selectFilter(type: 'words' | 'time') {
		gameStates.mode = type;
		if (type === 'words') {
			gameStates.totalGenerateWords = filter.words.filters[0];
		} else {
			gameStates.timeElapsedMode = filter.time.filters[0];
		}
		updateGameState();
	}

	function updateGameState() {
		if (gameStates.mode === 'words') {
			gameStates.currentText = generateRandomText(gameStates.totalGenerateWords);
			gameStates.timeElapsed = 0;
		} else {
			gameStates.currentText = generateRandomText(200); // Generate a large number of words for time mode
			gameStates.timeElapsed = gameStates.timeElapsedMode;
		}
		gameStates.userInput = gameStates.currentText.map(() => '');
		gameStates.currentWordIndex = 0;
		gameStates.correctChars = 0;
		gameStates.totalChars = 0;
		gameStates.accuracy = 100;
		gameStates.wpm = 0;
	}
</script>

<div
	class="absolute left-1/2 top-20 flex -translate-x-1/2 items-center gap-x-2 rounded-lg bg-neutral-700/60 px-5 py-1.5 text-white"
>
	<div
		class="transition-all hover:text-yellow-400"
		class:text-yellow-500={gameStates.isShowKeyboard}
	>
		<button
			onclick={() => {
				gameStates.isShowKeyboard = !gameStates.isShowKeyboard;
			}}
		>
			Show keyboard
		</button>
	</div>
	<div>|</div>
	<div class="flex items-center gap-x-2">
		<div
			class="transition-all hover:text-yellow-400"
			class:text-yellow-500={gameStates.mode === 'words'}
		>
			<button onclick={() => selectFilter('words')}> Words </button>
		</div>
		<div
			class="transition-all hover:text-yellow-400"
			class:text-yellow-500={gameStates.mode === 'time'}
		>
			<button onclick={() => selectFilter('time')}> Time </button>
		</div>
	</div>
	<div>|</div>
	{#if gameStates.mode === 'words'}
		<div class="flex items-center gap-x-2">
			{#each filter.words.filters as wordCount}
				<button
					class="transition-all hover:text-yellow-400"
					class:text-yellow-500={wordCount === gameStates.totalGenerateWords}
					onclick={() => {
						gameStates.totalGenerateWords = wordCount;
						updateGameState();
					}}>{wordCount}</button
				>
			{/each}
		</div>
	{:else}
		<div class="flex items-center gap-x-2">
			{#each filter.time.filters as time}
				<button
					class="transition-all hover:text-yellow-400"
					class:text-yellow-500={time === gameStates.timeElapsedMode}
					onclick={() => {
						gameStates.timeElapsedMode = time;
						updateGameState();
					}}>{time}</button
				>
			{/each}
		</div>
	{/if}
</div>
