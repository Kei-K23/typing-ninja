<script lang="ts">
	interface Props {
		currentText: string[];
		userInput: string;
		currentWordIndex: number;
		currentCharIndex: number;
	}

	let { currentText, userInput, currentWordIndex, currentCharIndex }: Props = $props();

	let wordsWithStatus = $derived.by(() => {
		return currentText.map((word, wordIndex) => {
			if (wordIndex < currentWordIndex) {
				// Completed words
				return word.split('').map((char) => ({ char, status: 'correct' }));
			} else if (wordIndex === currentWordIndex) {
				// Current word
				return word.split('').map((char, charIndex) => {
					if (charIndex < currentCharIndex) {
						return { char, status: userInput[charIndex] === char ? 'correct' : 'incorrect' };
					} else if (charIndex === currentCharIndex) {
						return { char, status: 'current' };
					} else {
						return { char, status: 'pending' };
					}
				});
			} else {
				// Pending words
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
					class:text-green-500={status === 'correct'}
					class:text-red-500={status === 'incorrect'}
					class:text-yellow-500={status === 'pending'}
					class:bg-gray-700={status === 'current'}>{char}</span
				>
			{/each}
		</span>
	{/each}
</div>
