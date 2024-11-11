<script lang="ts">
	import { generateRandomText } from '$lib/utils';
	import type { GameState } from '../../../../type';

	interface Props {
		gameStates: GameState;
	}

	let { gameStates }: Props = $props();

	// State for filters and current selection
	let filter = $state({
		words: {
			selected: gameStates.totalGenerateWords,
			filters: [10, 25, 50, 100]
		}
	});

	// Variable to track which filter type is selected ("time" or "words")
	let selectedFilter: 'words' | null = $state('words');

	// Function to handle when a filter type (time or words) is selected
	function selectFilter(type: 'words') {
		// Set selectedFilter only if it's currently not set
		if (!selectedFilter) {
			selectedFilter = type;
		}
	}
</script>

<div>
	<div class="">
		<button onclick={() => selectFilter('words')}> Words </button>
	</div>
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
</div>
