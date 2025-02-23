import { useEffect, useState, useCallback } from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonBattle() {
	const [pokemon1, setPokemon1] = useState(null);
	const [pokemon2, setPokemon2] = useState(null);
	const [winner, setWinner] = useState(null);

	// Function to fetch a random Pokémon
	const fetchRandomPokemon = useCallback(async () => {
		// Fetch all Pokémon concurrently
		const getRandomPokemon = async () => {
			const response = await fetch(
				"https://pokeapi.co/api/v2/pokemon?limit=100",
			);
			const data = await response.json();
			const randomPokemon =
				data.results[Math.floor(Math.random() * data.results.length)];
			const pokemonResponse = await fetch(randomPokemon.url);
			return pokemonResponse.json();
		};

		// Fetch two random Pokémon concurrently
		const [p1, p2] = await Promise.all([
			getRandomPokemon(),
			getRandomPokemon(),
		]);
		setPokemon1(p1);
		setPokemon2(p2);
		setWinner(null);
	}, []);

	useEffect(() => {
		fetchRandomPokemon();
	}, [fetchRandomPokemon]);

	// Function to compare stats and determine the winner
	const battlePokemon = () => {
		if (!pokemon1 || !pokemon2) return;

		const totalStats1 = pokemon1.stats.reduce(
			(sum, stat) => sum + stat.base_stat,
			0,
		);
		const totalStats2 = pokemon2.stats.reduce(
			(sum, stat) => sum + stat.base_stat,
			0,
		);

		// Determine winner
		if (totalStats1 > totalStats2) setWinner(pokemon1.name);
		else if (totalStats1 < totalStats2) setWinner(pokemon2.name);
		else setWinner("It's a tie! 🤝");
	};

	if (!pokemon1 || !pokemon2)
		return <p className="text-center text-gray-600">Loading...</p>;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
			<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-700 mb-12 text-center">
				Pokémon Battle
			</h1>

			{/* Flex container for side-by-side cards */}
			<div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-8 sm:space-y-0">
				{/* Pokémon Card 1 */}
				<PokemonCard pokemon={pokemon1} isWinner={winner === pokemon1.name} />

				{/* Battle Buttons in the center */}
				<div className="flex flex-col items-center justify-center min-w-[150px] space-y-4">
					<button
						type="button"
						onClick={battlePokemon}
						className="border-2 border-gray-300 px-6 py-3 bg-green-400 text-white rounded-lg text-lg font-semibold hover:bg-green-500 transition"
					>
						Fight!
					</button>
					<button
						type="button"
						onClick={fetchRandomPokemon}
						className="border-2 border-gray-300 px-6 py-3 bg-blue-400 text-white rounded-lg text-lg font-semibold hover:bg-blue-500 transition"
					>
						New Battle
					</button>
				</div>

				{/* Pokémon Card 2 */}
				<PokemonCard pokemon={pokemon2} isWinner={winner === pokemon2.name} />
			</div>

			{/* Winner Announcement */}
			<div className="mt-6 sm:mt-12 text-xl sm:text-2xl lg:text-5xl font-bold text-gray-900 min-h-[50px] flex justify-center items-center">
				{winner ? (
					<p className="text-center">
						{winner === "It's a tie! 🤝"
							? winner
							: `${winner.toUpperCase()} wins! 🏆`}
					</p>
				) : (
					<p className="text-transparent"> </p>
				)}
			</div>
		</div>
	);
}
