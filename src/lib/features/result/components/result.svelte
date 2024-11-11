<script lang="ts">
	import type { GameState } from '../../../../type';

	interface Props {
		gameStates: GameState;
		timerInterval: number;
		startGame: () => void;
	}

	let { gameStates, timerInterval, startGame }: Props = $props();

	// Reset the game with default value
	const resetGame = () => {
		// Clear timer interval
		clearInterval(timerInterval);

		// Start the Game again
		startGame();
	};
</script>

<div class="mx-auto mt-36 w-full max-w-xl">
	<div class="grid grid-cols-2 gap-7">
		<div
			class="flex flex-col items-center justify-center gap-y-2 rounded-2xl bg-neutral-900 p-5 transition-all hover:shadow-lg hover:shadow-neutral-700"
		>
			<h3 class="text-2xl">WPM</h3>
			<span class="text-6xl text-yellow-500">{gameStates.wpm}</span>
		</div>
		<div
			class="flex flex-col items-center justify-center gap-y-2 rounded-2xl bg-neutral-900 p-5 transition-all hover:shadow-lg hover:shadow-neutral-700"
		>
			<h3 class="text-2xl">Accuracy</h3>
			<span class="text-6xl text-yellow-500">{gameStates.accuracy}%</span>
		</div>
		<div
			class="flex flex-col items-center justify-center gap-y-2 rounded-2xl bg-neutral-900 p-5 transition-all hover:shadow-lg hover:shadow-neutral-700"
		>
			<h3 class="text-2xl">Characters</h3>
			<div>
				<p>Correct: {gameStates.correctChars}/{gameStates.totalChars}</p>
				<p>Incorrect: {gameStates.totalChars - gameStates.correctChars}/{gameStates.totalChars}</p>
			</div>
		</div>
		<div
			class="flex flex-col items-center justify-center gap-y-2 rounded-2xl bg-neutral-900 p-5 transition-all hover:shadow-lg hover:shadow-neutral-700"
		>
			<h3 class="text-2xl">Times</h3>
			<p>
				<span class="text-6xl text-yellow-500">{gameStates.timeElapsed}</span><span
					class="text-5xl text-yellow-500">s</span
				>
			</p>
		</div>
	</div>
	<div class="mt-10 flex items-center justify-center">
		<button
			class="rounded-lg bg-neutral-600 px-5 py-1.5 text-white hover:bg-neutral-700 hover:text-white/80"
			onclick={resetGame}>Restart Game</button
		>
	</div>
</div>
