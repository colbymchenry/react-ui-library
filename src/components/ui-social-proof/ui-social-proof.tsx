import { cx } from "../../lib/cx";
import { MaterialIcon } from "../material-icon/material-icon";

interface SocialProofProps {
	/** Array of avatar image URLs */
	avatars?: string[];
	/** Number of additional users beyond the shown avatars */
	additionalCount?: number;
	/** Rating value (1-5) */
	rating?: number;
	/** Text to display below the rating */
	subtitle?: string;
	/** Additional CSS classes for the container */
	className?: string;
}

/**
 * Formats large numbers into compact notation (e.g., 2000 -> "2k")
 */
function formatCount(count: number): string {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(0)}k`;
	}
	return count.toString();
}

/**
 * SocialProof Component
 *
 * Displays social proof with user avatars, rating stars, and a subtitle.
 * Used to build trust by showing that other users love the product.
 * Features a glassmorphism design with backdrop blur.
 *
 * @example
 * // Basic usage
 * <SocialProof
 *   avatars={['avatar1.jpg', 'avatar2.jpg', 'avatar3.jpg']}
 *   additionalCount={2000}
 *   rating={5}
 *   subtitle="Trusted by Coffee Lovers"
 * />
 *
 * @example
 * // Minimal usage
 * <SocialProof
 *   rating={5}
 *   subtitle="5-star rated"
 * />
 */
export function SocialProof({
	avatars = [],
	additionalCount = 0,
	rating = 5,
	subtitle = "Trusted by Users",
	className,
}: SocialProofProps) {
	/**
	 * Renders star icons based on the rating value.
	 * Filled stars for rating, outlined for remaining.
	 */
	const renderStars = () => {
		return Array.from({ length: 5 }).map((_, index) => (
			<MaterialIcon
				key={index}
				name="star"
				variant={index < rating ? "filled" : "outlined"}
				className="text-[16px]"
			/>
		));
	};

	return (
		<div
			className={cx(
				"flex items-center gap-4",
				"bg-white/10 backdrop-blur-md",
				"p-4 rounded-xl border border-white/10 w-fit",
				className
			)}
		>
			{/* Stacked avatars */}
			{(avatars.length > 0 || additionalCount > 0) && (
				<div className="flex -space-x-3">
					{avatars.map((avatarUrl, index) => (
						<img
							key={index}
							alt="User avatar"
							className="w-10 h-10 rounded-full border-2 border-gray-900 object-cover"
							src={avatarUrl}
						/>
					))}
					{additionalCount > 0 && (
						<div className="w-10 h-10 rounded-full border-2 border-gray-900 bg-primary flex items-center justify-center text-xs font-bold text-white">
							+{formatCount(additionalCount)}
						</div>
					)}
				</div>
			)}

			{/* Rating and subtitle */}
			<div className="text-sm font-medium text-gray-200">
				<div className="flex text-amber-400">
					{renderStars()}
				</div>
				<span className="opacity-80 text-xs uppercase tracking-wide">
					{subtitle}
				</span>
			</div>
		</div>
	);
}

export default SocialProof;

