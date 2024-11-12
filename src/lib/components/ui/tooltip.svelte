<script lang="ts">
	import type { Theme } from '$lib/data';
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		position?: 'top' | 'bottom' | 'left' | 'right';
		delay?: number;
		duration?: number;
		gameTheme: Theme;
		children: Snippet;
		content: Snippet;
	}

	let {
		position = 'top',
		delay = 200,
		duration = 100,
		gameTheme,
		children,
		content
	}: Props = $props();

	let visible = $state(false);
	let tooltipRef: HTMLDivElement | null = $state(null);
	let triggerRef: HTMLDivElement;

	const positions = {
		top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
		bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
		left: 'right-full top-1/2 -translate-y-1/2 mr-2',
		right: 'left-full top-1/2 -translate-y-1/2 ml-2'
	};

	const arrows = {
		top: `bottom-[-8px] left-1/2 -translate-x-1/2 border-t-[8px] border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-0`,
		bottom: `top-[-8px] left-1/2 -translate-x-1/2 rotate-180 border-t-[8px]  border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-0`,
		left: `right-[-8px] top-1/2 -translate-y-1/2 -rotate-180 border-l-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px]`,
		right: `left-[-8px] top-1/2 -translate-y-1/2 rotate-180 border-r-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px]`
	};

	let timeoutId: number;

	function showTooltip() {
		timeoutId = setTimeout(() => {
			visible = true;
		}, delay);
	}

	function hideTooltip() {
		clearTimeout(timeoutId);
		visible = false;
	}

	$effect(() => {
		return () => {
			clearTimeout(timeoutId);
		};
	});
</script>

<div
	class="relative inline-block"
	role="tooltip"
	aria-describedby={'svelte5_tooltip'}
	onmouseenter={showTooltip}
	onmouseleave={hideTooltip}
	onfocusin={showTooltip}
	onfocusout={hideTooltip}
	bind:this={triggerRef}
>
	{@render children()}

	{#if visible}
		<div
			bind:this={tooltipRef}
			transition:fade={{ duration }}
			class="absolute z-50 whitespace-nowrap rounded px-2 py-1 text-sm shadow-lg {positions[
				position
			]} {gameTheme.accentBackgroundColor} {gameTheme.textColor}"
			role="tooltip"
		>
			<div
				class="absolute h-0 w-0 border-4 {gameTheme.accentBorderColor} {arrows[position]}"
				aria-hidden="true"
			></div>
			{@render content()}
		</div>
	{/if}
</div>
