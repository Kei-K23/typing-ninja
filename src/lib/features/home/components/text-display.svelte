<script lang="ts">
	interface Props {
		currentText: string[];
		userInput: string[];
		currentWordIndex: number;
	}

	let { currentText, userInput, currentWordIndex }: Props = $props();

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
</script>

<div class="mt-4 max-h-[250px] overflow-auto text-4xl leading-relaxed">
	{#each wordsWithStatus as word, wordIndex}
		<span class="mr-4 inline-block font-mono">
			<span class="flex items-center">
				{#each word as { char, status }}
					<span
						class:text-gray-200={status === 'correct'}
						class:text-red-500={status === 'incorrect'}
						class:text-gray-400={status === 'pending'}
						class:bg-gray-700={status === 'current'}>{char}</span
					>
				{/each}
				{#if userInput[wordIndex]?.length > word.length}
					<span class="text-red-500/60">{userInput[wordIndex].slice(word.length)}</span>
				{/if}
			</span>
		</span>
	{/each}
</div>
