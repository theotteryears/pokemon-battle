import { useEffect, useState, useCallback } from "react";
import PokemonCard from "./PokemonCard";

export default function PokemonBattle() {
	const [pokemon1, setPokemon1] = useState(null);
	const [pokemon2, setPokemon2] = useState(null);
	const [winner, setWinner] = useState(null);
	const [statUsed, setStatUsed] = useState(null);
	const [winningStat, setWinningStat] = useState(null);
	const [losingStat, setLosingStat] = useState(null);

	const fetchRandomPokemon = useCallback(async () => {
		const getRandomPokemon = async () => {
			const response = await fetch("https://pokeapi.co/api/v2/pokemon");
			const data = await response.json();
			const randomPokemon =
				data.results[Math.floor(Math.random() * data.results.length)];
			const pokemonResponse = await fetch(randomPokemon.url);
			return pokemonResponse.json();
		};

		const [p1, p2] = await Promise.all([
			getRandomPokemon(),
			getRandomPokemon(),
		]);
		setPokemon1(p1);
		setPokemon2(p2);
		setWinner(null);
		setStatUsed(null);
		setWinningStat(null);
		setLosingStat(null);
	}, []);

	useEffect(() => {
		fetchRandomPokemon();
	}, [fetchRandomPokemon]);

	const battlePokemon = () => {
		if (!pokemon1 || !pokemon2) return;

		const randomStatIndex = Math.floor(Math.random() * pokemon1.stats.length);
		const stat1 = pokemon1.stats[randomStatIndex];
		const stat2 = pokemon2.stats[randomStatIndex];

		setStatUsed(stat1.stat.name);

		if (stat1.base_stat > stat2.base_stat) {
			setWinner(pokemon1.name);
			setWinningStat(stat1.stat.name);
			console.log(stat1.stat.name);
			setLosingStat(stat2.stat.name);
		} else if (stat1.base_stat < stat2.base_stat) {
			setWinner(pokemon2.name);
			setWinningStat(stat2.stat.name);
			setLosingStat(stat1.stat.name);
		} else {
			setWinner("It's a tie! 🤝");
			setWinningStat(null);
			setLosingStat(null);
		}
	};

	if (!pokemon1 || !pokemon2)
		return <p className="text-center text-gray-600">Loading...</p>;

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
			<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-700 mb-12 text-center">
				Pokémon Battle
			</h1>

			<div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-8 sm:space-y-0">
				<PokemonCard
					pokemon={pokemon1}
					isWinner={winner === pokemon1.name}
					winningStat={winningStat}
					losingStat={losingStat}
				/>

				<div className="flex flex-col items-center justify-center min-w-[150px] space-y-4">
					<h2 className="text-6xl m-16">VS</h2>
					<button
						type="button"
						onClick={battlePokemon}
						className="px-6 py-3 bg-green-400 text-white rounded-lg text-lg font-semibold hover:bg-green-500 transition"
					>
						Fight!
					</button>
					<button
						type="button"
						onClick={fetchRandomPokemon}
						className="px-6 py-3 bg-blue-400 text-white rounded-lg text-lg font-semibold hover:bg-blue-500 transition"
					>
						New Battle
					</button>
				</div>

				<PokemonCard
					pokemon={pokemon2}
					isWinner={winner === pokemon2.name}
					winningStat={winningStat}
					losingStat={losingStat}
				/>
			</div>

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
