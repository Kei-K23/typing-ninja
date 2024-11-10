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

<div class="mx-auto mt-36 max-w-6xl">
	<div class="text-center">
		<p>WPM: {gameStates.wpm}</p>
		<p>Accuracy: {gameStates.accuracy}%</p>
	</div>
	<button onclick={resetGame}>Restart Game</button>
</div>
