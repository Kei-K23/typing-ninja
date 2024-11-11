<script lang="ts">
	interface Props {
		timeElapsed: number;
		timerInterval: number;
		isPending: boolean;
	}

	const { timeElapsed, timerInterval, isPending }: Props = $props();

	$effect(() => {
		return () => clearInterval(timerInterval);
	});
</script>

<div class="font-mono text-2xl" class:opacity-0={isPending}>
	{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
</div>
