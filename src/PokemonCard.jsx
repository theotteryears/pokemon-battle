import clsx from "clsx";

export default function PokemonCard({ pokemon, isWinner }) {
	return (
		<div
			className={clsx(
				"max-w-sm p-6 rounded-2xl overflow-hidden shadow-lg bg-white border-2 border-solid",
				isWinner ? "border-green-500 border-2" : "border-gray-200",
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
					{pokemon.stats.map((stat) => (
						<p key={stat.stat.name} className="text-gray-700">
							<span className="font-semibold capitalize">
								{stat.stat.name}:
							</span>{" "}
							{stat.base_stat}
						</p>
					))}
					<p className="text-gray-700">
						<span className="font-semibold capitalize">Weight:</span>
						{pokemon.weight}
					</p>
				</div>
			</div>
		</div>
	);
}
