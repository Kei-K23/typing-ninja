<script lang="ts">
	interface Props {
		timeElapsed: number;
		isPending: boolean;
	}

	const { timeElapsed, isPending }: Props = $props();
</script>

<div class="font-mono text-2xl" class:opacity-0={isPending}>
	{Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
</div>
