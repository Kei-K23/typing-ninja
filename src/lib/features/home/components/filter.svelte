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
			selected: gameStates.totalGenerateWords,
			filters: [10, 25, 50, 100]
		},
		time: {
			selected: 15,
			filters: [15, 30, 60, 120]
		}
	});

	// Variable to track which filter type is selected ("time" or "words")
	let selectedFilter: 'words' | 'time' | null = $state('words');

	function selectFilter(type: 'words' | 'time') {
		if (!selectedFilter) {
			selectedFilter = type;
		}

		if (type === 'words') {
			gameStates.mode = 'words';
		} else if (type === 'time') {
			gameStates.mode = 'time';
			// Default for time
			gameStates.timeElapsed = 15;
			gameStates.timeElapsedMode = 15;
		}
	}

	$inspect(selectedFilter);
</script>

<div
	class="absolute left-1/2 top-20 flex -translate-x-1/2 items-center gap-x-2 rounded-lg bg-neutral-700/60 px-5 py-1.5 text-white"
>
	<div class="flex items-center gap-x-2">
		<div class:text-yellow-500={selectedFilter === 'words'}>
			<button onclick={() => selectFilter('words')}> Words </button>
		</div>
		<div class:text-yellow-500={selectedFilter === 'time'}>
			<button onclick={() => selectFilter('time')}> time </button>
		</div>
	</div>
	<div>|</div>
	{#if selectedFilter === 'words'}
		<div class="flex items-center gap-x-2">
			{#each filter.words.filters as wordCount}
				<button
					class:text-yellow-500={wordCount === gameStates.totalGenerateWords}
					onclick={() => {
						gameStates.totalGenerateWords = wordCount;
						gameStates.currentText = generateRandomText(wordCount);
					}}>{wordCount}</button
				>
			{/each}
		</div>
	{/if}
	{#if selectedFilter === 'time'}
		<div class="flex items-center gap-x-2">
			{#each filter.time.filters as time}
				<button
					class:text-yellow-500={time === gameStates.totalGenerateWords}
					onclick={() => {
						gameStates.totalGenerateWords = time;
						gameStates.currentText = generateRandomText(time);
					}}>{time}</button
				>
			{/each}
		</div>
	{/if}
</div>
