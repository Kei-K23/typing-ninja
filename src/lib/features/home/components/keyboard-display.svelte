<script lang="ts">
	import type { Theme } from '$lib/data';

	interface Props {
		recentKeys: string[];
		maxDisplayKeys?: number;
		gameTheme: Theme;
	}

	let { recentKeys = [], maxDisplayKeys = 5, gameTheme }: Props = $props();

	let displayKeys = $derived(() => recentKeys.slice(-maxDisplayKeys).reverse());
</script>

<div class="fixed bottom-8 left-1/2 -translate-x-1/2 transform">
	<div class="flex justify-center space-x-2">
		{#each displayKeys() as key, index}
			<div
				class="flex h-12 min-w-12 items-center justify-center rounded-lg border border-zinc-600 px-3 text-lg font-bold transition-all duration-200 {gameTheme.opacityAccentBackgroundColor} {gameTheme.textColor}"
				style="opacity: {1 - index * 0.2}; transform: scale({1 - index * 0.05});"
			>
				{key}
			</div>
		{/each}
	</div>
</div>
