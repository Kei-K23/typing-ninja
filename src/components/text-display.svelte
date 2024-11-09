<script lang="ts">
	interface Props {
		currentText: string;
		userInputText: string;
	}

	let { currentText, userInputText }: Props = $props();

	// Reactive derived change every userInputText value change
	let chars = $derived.by(() => {
		const chars = currentText.split('').map((char, index) => {
			if (index >= userInputText.length) {
				return { char, status: 'pending' };
			}
			return {
				char,
				status: char === userInputText[index] ? 'correct' : 'incorrect'
			};
		});

		return chars;
	});
</script>

<div>
	{#each chars as { char, status }}
		<span
			class:text-green-500={status === 'correct'}
			class:text-red-500={status === 'incorrect'}
			class:text-yellow-500={status === 'pending'}>{char}</span
		>
	{/each}
</div>
