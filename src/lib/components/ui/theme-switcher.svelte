<script lang="ts">
	import { themes, type Theme } from '$lib/data';

	interface Props {
		gameTheme: Theme;
	}

	let { gameTheme = $bindable() }: Props = $props();

	function setTheme(theme: Theme) {
		gameTheme = theme;
	}
</script>

<select
	class="rounded-lg p-2 {gameTheme.textColor} {gameTheme.opacityAccentBackgroundColor}"
	onchange={(e) => setTheme(themes[parseInt(e.currentTarget.value)])}
>
	{#each themes as theme, i}
		<option value={i}>{theme.name}</option>
	{/each}
</select>
