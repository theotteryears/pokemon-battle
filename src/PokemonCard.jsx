import clsx from "clsx";

export default function PokemonCard({
	pokemon,
	isWinner,
	winningStat,
	losingStat,
	tieStat, // Pass tieStat from the parent component
}) {
	return (
		<div
			className={clsx(
				"max-w-sm p-6 rounded-2xl overflow-hidden shadow-lg bg-white border-4 border-solid",
				isWinner ? "border-green-500" : "border-gray-200",
			)}
		>
			<img
				className="w-full h-64 object-contain bg-gray-100 p-4"
				src={
					pokemon.sprites.other["official-artwork"].front_default ||
					pokemon.sprites.front_default
				}
				alt={pokemon.name}
			/>
			<h2 className="text-2xl font-semibold text-gray-800 capitalize text-center">
				{pokemon.name}
			</h2>

			<div className="mt-4">
				<div className="text-center">
					{pokemon.stats.map((stat) => {
						// Determine if the stat is part of a tie
						const isTie = stat.stat.name === tieStat;

						return (
							<p
								key={stat.stat.name}
								className={clsx(
									// Apply appropriate color based on the winner, loser, or tie
									isTie && "text-yellow-500", // Highlight tie stat in yellow
									isWinner
										? stat.stat.name === winningStat
											? "text-green-500"
											: "text-gray-600"
										: stat.stat.name === losingStat
											? "text-red-500"
											: "text-gray-600",
								)}
							>
								<span className="font-semibold capitalize">
									{stat.stat.name}:
								</span>{" "}
								{stat.base_stat}
							</p>
						);
					})}
				</div>
			</div>
		</div>
	);
}
