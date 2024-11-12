<script lang="ts">
	import type { Theme } from '$lib/data';

	interface Props {
		currentText: string[];
		userInput: string[];
		currentWordIndex: number;
		gameTheme: Theme;
	}

	let { currentText, userInput, currentWordIndex, gameTheme }: Props = $props();
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

<div
	bind:this={containerRef}
	class="mt-4 max-h-[240px] select-none overflow-hidden text-4xl leading-loose"
>
	{#each wordsWithStatus as word, wordIndex}
		<span
			class="mr-4 inline-block font-mono {wordIndex === currentWordIndex &&
				`${gameTheme.accentBackgroundColor} rounded-md px-2 py-1`}"
			bind:this={wordRefs[wordIndex]}
		>
			<span class="relative flex items-center">
				{#each word as { char, status }}
					<span
						class={`${status === 'current' && gameTheme.accentBgColor} ${status === 'correct' && gameTheme.textColor}`}
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
