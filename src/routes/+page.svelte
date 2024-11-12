<script lang="ts">
	import { generateRandomText } from '$lib/utils';
	import TextDisplay from '$lib/features/home/components/text-display.svelte';
	import Timer from '$lib/features/home/components/timer.svelte';
	import type { GameState } from '../type';
	import Result from '$lib/features/home/components/result.svelte';
	import Filter from '$lib/features/home/components/filter.svelte';
	import Tooltip from '$lib/components/ui/tooltip.svelte';
	import KeyboardDisplay from '$lib/features/home/components/keyboard-display.svelte';
	import { themes } from '$lib/data';
	import Header from '$lib/components/header.svelte';

	let gameStates = $state<GameState>({
		currentText: [],
		currentWordIndex: 0,
		userInput: [],
		accuracy: 100,
		wpm: 0,
		correctChars: 0,
		totalChars: 0,
		timeElapsed: 0,
		timeElapsedMode: 15,
		totalGenerateWords: 25,
		mode: 'words',
		isPlaying: false,
		isFinish: false,
		isPending: true,
		isShowKeyboard: true
	});

	let gameTheme = $state(themes[0]);

	let recentKeys: string[] = $state([]);
	let timerInterval = $state(0);

	const startTimer = () => {
		timerInterval = setInterval(() => {
			if (gameStates.mode === 'time') {
				gameStates.timeElapsed--;
			} else {
				gameStates.timeElapsed++;
			}
			updateWPM();
		}, 1000);
	};

	const stopTimer = () => {
		clearInterval(timerInterval);
	};

	const updateWPM = () => {
		const minutes =
			gameStates.mode === 'time'
				? (gameStates.timeElapsedMode - gameStates.timeElapsed) / 60
				: gameStates.timeElapsed / 60;
		const wordsTyped = gameStates.correctChars / 5; // Assuming average word length of 5 characters
		gameStates.wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
	};

	const initGame = () => {
		gameStates.isPlaying = false;
		gameStates.isFinish = false;
		gameStates.isPending = true;
		gameStates.isShowKeyboard = true;
		gameStates.currentWordIndex = 0;
		gameStates.correctChars = 0;
		gameStates.totalChars = 0;
		gameStates.accuracy = 100;
		gameStates.wpm = 0;

		if (gameStates.mode === 'words') {
			gameStates.currentText = generateRandomText(gameStates.totalGenerateWords);
			gameStates.timeElapsed = 0;
		} else {
			gameStates.currentText = generateRandomText(100); // Generate a large number of words for time mode
			gameStates.timeElapsed = gameStates.timeElapsedMode;
		}
		gameStates.userInput = gameStates.currentText.map(() => '');
	};

	const startGame = () => {
		gameStates.isPending = false;
		gameStates.isPlaying = true;
		startTimer();
	};

	const stopGame = () => {
		gameStates.isPlaying = false;
		gameStates.isFinish = true;
		gameStates.isPending = false;
		stopTimer();
	};

	function onHandleUserInputKeyDown(e: KeyboardEvent) {
		if (!gameStates.isPlaying && gameStates.isPending) {
			startGame();
		}

		if (!gameStates.isPlaying) return;

		const key = e.key;

		// Add the pressed key to recentKeys
		if (key.length === 1 || key === 'Backspace' || key === 'Space') {
			recentKeys = [...recentKeys, key === ' ' ? 'Space' : key];
		}

		const currentWord = gameStates.currentText[gameStates.currentWordIndex];
		let currentInput = gameStates.userInput[gameStates.currentWordIndex];

		if (key === ' ') {
			if (gameStates.currentWordIndex < gameStates.currentText.length - 1) {
				gameStates.currentWordIndex++;
			} else if (gameStates.mode === 'words') {
				stopGame();
			}
		} else if (key.length === 1) {
			currentInput += key;
			gameStates.userInput[gameStates.currentWordIndex] = currentInput;
			gameStates.totalChars++;

			if (gameStates.mode === 'words') {
				if (gameStates.currentWordIndex === gameStates.userInput.length - 1) {
					if (
						gameStates.currentText[gameStates.currentWordIndex].length ===
						gameStates.userInput[gameStates.userInput.length - 1].length
					) {
						stopGame();
					}
				}
			}

			if (
				currentInput.length <= currentWord.length &&
				key === currentWord[currentInput.length - 1]
			) {
				gameStates.correctChars++;
			}
		} else if (key === 'Backspace') {
			if (currentInput.length > 0) {
				const lastChar = currentInput[currentInput.length - 1];
				const expectedChar = currentWord[currentInput.length - 1];

				currentInput = currentInput.slice(0, -1);
				gameStates.userInput[gameStates.currentWordIndex] = currentInput;
				gameStates.totalChars--;

				if (lastChar === expectedChar) {
					gameStates.correctChars--;
				}
			} else if (gameStates.currentWordIndex > 0) {
				gameStates.currentWordIndex--;
			}
		}

		updateAccuracy();
	}

	function updateAccuracy() {
		gameStates.accuracy =
			Math.round((gameStates.correctChars / gameStates.totalChars) * 100) || 100;
	}

	$effect(() => {
		if (gameStates.mode === 'time' && gameStates.timeElapsed === 0 && gameStates.isPlaying) {
			stopGame();
		}
	});

	// Init the game state
	initGame();
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

<main class="flex h-full flex-col {gameTheme.backgroundColor}  font-mono {gameTheme.textColor}">
	<div class="flex flex-col">
		{#if !gameStates.isFinish}
			<Header isPending={gameStates.isPending} />
			<div class="mx-auto mb-10 mt-28 max-w-6xl">
				{#if gameStates.isPending}
					<Filter bind:gameStates bind:gameTheme />
				{/if}
				<Timer isPending={gameStates.isPending} timeElapsed={gameStates.timeElapsed} />

				<TextDisplay
					{gameTheme}
					currentText={gameStates.currentText}
					userInput={gameStates.userInput}
					currentWordIndex={gameStates.currentWordIndex}
				/>
				{#if gameStates.isPending}
					<div class="mt-10 flex flex-col items-center justify-center gap-y-5">
						{#if gameStates.mode === 'words'}
							<Tooltip position="top" {gameTheme}>
								<button
									onclick={() => {
										gameStates.currentText = generateRandomText(gameStates.totalGenerateWords);
									}}
								>
									<img src="/restart_icon.svg" alt="restart_icon" class="size-8" />
								</button>
								{#snippet content()}
									<p class={gameTheme.accentColor}>Restart Text</p>
								{/snippet}
							</Tooltip>
						{/if}
						<p class="animate-pulse text-center text-xl {gameTheme.textColor}">
							Press any key to start
						</p>
					</div>
				{/if}
			</div>
			{#if gameStates.isPlaying && gameStates.isShowKeyboard}
				<KeyboardDisplay {gameTheme} {recentKeys} />
			{/if}
		{:else}
			<Result {timerInterval} {initGame} {gameStates} {gameTheme} />
		{/if}
	</div>
</main>

<svelte:window on:keydown={onHandleUserInputKeyDown} />
