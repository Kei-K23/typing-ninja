<script lang="ts">
	interface Props {
		currentText: string[];
		userInput: string;
		currentWordIndex: number;
	}

	let { currentText, userInput, currentWordIndex }: Props = $props();

	let wordsWithStatus = $derived.by(() => {
		return currentText.map((word, wordIndex) => {
			if (wordIndex < currentWordIndex) {
				// Completed words
				return word.split('').map((char) => ({ char, status: 'past' }));
			} else if (wordIndex === currentWordIndex) {
				// Current word
				return word.split('').map((char, charIndex) => {
					if (charIndex < userInput.length) {
						return {
							char,
							status: userInput[charIndex] === char ? 'correct' : 'incorrect'
						};
					} else if (charIndex === userInput.length) {
						return { char, status: 'current' };
					} else {
						return { char, status: 'pending' };
					}
				});
			} else {
				// Future words
				return word.split('').map((char) => ({ char, status: 'pending' }));
			}
		});
	});
</script>

<div class="mt-4 text-2xl leading-relaxed">
	{#each wordsWithStatus as word, wordIndex}
		<span class="mr-2 inline-block">
			{#each word as { char, status }}
				<span
					class:text-gray-500={status === 'past'}
					class:text-green-500={status === 'correct'}
					class:text-red-500={status === 'incorrect'}
					class:text-yellow-500={status === 'pending'}
					class:bg-gray-700={status === 'current'}>{char}</span
				>
			{/each}
			{#if wordIndex === currentWordIndex && userInput.length > word.length}
				<span class="text-red-500">{userInput.slice(word.length)}</span>
			{/if}
		</span>
	{/each}
</div>
