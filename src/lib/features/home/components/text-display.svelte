<script lang="ts">
	interface Props {
		currentText: string[];
		userInput: string[];
		currentWordIndex: number;
	}

	let { currentText, userInput, currentWordIndex }: Props = $props();
	let containerRef: HTMLDivElement | null = $state(null);
	let wordRefs: HTMLSpanElement[] = $state([]);

	let wordsWithStatus = $derived.by(() => {
		return currentText.map((word, wordIndex) => {
			const input = userInput[wordIndex] || '';
			return word.split('').map((char, charIndex) => {
				if (charIndex < input.length) {
					return {
						char,
						status: input[charIndex] === char ? 'correct' : 'incorrect'
					};
				} else if (wordIndex < currentWordIndex) {
					return { char, status: 'incorrect' }; // Missing characters in completed words
				} else if (wordIndex === currentWordIndex && charIndex === input.length) {
					return { char, status: 'current' };
				} else {
					return { char, status: 'pending' };
				}
			});
		});
	});

	function scrollToCurrentWord() {
		if (containerRef && wordRefs[currentWordIndex]) {
			const containerRect = containerRef.getBoundingClientRect();
			const wordRect = wordRefs[currentWordIndex].getBoundingClientRect();

			if (wordRect.bottom > containerRect.bottom || wordRect.top < containerRect.top) {
				wordRefs[currentWordIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
		}
	}

	$effect(() => {
		scrollToCurrentWord();
	});
</script>

<div bind:this={containerRef} class="mt-4 max-h-[240px] overflow-hidden text-4xl leading-loose">
	{#each wordsWithStatus as word, wordIndex}
		<span
			class="mr-4 inline-block font-mono"
			class:bg-zinc-700={wordIndex === currentWordIndex}
			class:rounded-md={wordIndex === currentWordIndex}
			class:px-2={wordIndex === currentWordIndex}
			class:py-1={wordIndex === currentWordIndex}
			bind:this={wordRefs[wordIndex]}
		>
			<span class="relative flex items-center">
				{#each word as { char, status }}
					<span
						class={`${status === 'current' && 'bg-yellow-500/40'}`}
						class:text-gray-200={status === 'correct'}
						class:text-red-500={status === 'incorrect'}
						class:text-gray-500={status === 'pending'}>{char}</span
					>
				{/each}
				{#if userInput[wordIndex]?.length > word.length}
					<span class="text-red-500/60">{userInput[wordIndex].slice(word.length)}</span>
				{/if}
			</span>
		</span>
	{/each}
</div>
