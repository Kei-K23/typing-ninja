<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<svelte:head>
	<title>Typing-Ninja</title>
	<meta
		name="description"
		content="Typing Ninja is a open-source testing web application with minimalistic design and customization."
	/>
	<meta property="og_site_name" content="“Typing-Ninja" />
	<meta property="og:url" content="" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={'Typing-Ninja'} />
	<meta
		property="og:description"
		content={'Typing Ninja is a open-source testing web application with minimalistic design and customization.'}
	/>
	<meta property="og:image" content={''} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="" />
	<meta property="twitter:url" content="" />
	<meta name="twitter:title" content={'Typing-Ninja'} />
	<meta
		name="twitter:description"
		content={'Typing Ninja is a open-source testing web application with minimalistic design and customization.'}
	/>
	<meta name="twitter:image" content={''} />
</svelte:head>

{@render children()}
