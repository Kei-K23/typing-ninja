<script lang="ts">
	interface Props {
		timeElapsed: number;
		timerInterval: number;
	}

	const { timeElapsed, timerInterval }: Props = $props();

	$effect(() => {
		return () => clearInterval(timerInterval);
	});
</script>

<div class="font-mono text-2xl">
	{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
</div>
