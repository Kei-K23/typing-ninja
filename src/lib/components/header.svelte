<script lang="ts">
	interface Props {
		isPending: boolean;
	}

	let { isPending }: Props = $props();
</script>

<header class="py-4" class:opacity-0={!isPending}>
	<div class="mx-auto flex max-w-6xl items-center justify-between">
		<a href="/" class="text-lg text-gray-400 transition-all hover:text-yellow-500">
			Typing-Ninja 🥷⌨️
		</a>
		<a href="https://github.com/Kei-K23/typing-ninja" target="_blank">
			<img
				src="/github.svg"
				alt="github"
				class="size-7 opacity-60 transition-all hover:opacity-100"
			/>
		</a>
	</div>
</header>
