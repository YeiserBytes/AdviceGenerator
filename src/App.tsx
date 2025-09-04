import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { Toaster, toast } from "sonner";
import "./App.scss";
import Dividers from "./components/Dividers";
import Footer from "./components/Footer";
import useAdvice from "./hooks/useAdvice";
import useSEO from "./hooks/useSEO";

export default function App() {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const { advice, adviceId, handleClick, isLoading, error } = useAdvice();

	// Trigger toast only when error changes
	if (error) {
		toast.error(error, {
			duration: 4000,
			action: {
				label: "Try again",
				onClick: handleClick,
			},
		});
	}

	useSEO({
		title: `#${adviceId} - Advice generator`,
		description: `Get random advice #${adviceId} and many more!`,
	});

	return (
		<>
			<section className="card">
				<p className="advice-id">Advice #{adviceId}</p>
				<h1 className="advice-text">{`“${advice}”`}</h1>
				<Dividers query={isMobile} className="divider" />
				<button
					type="button"
					onClick={handleClick}
					aria-label="Generate new advice"
					className="dice-button"
				>
					<svg
						width="24"
						height="24"
						className={clsx({ rotateA: isLoading, rotateB: !isLoading })}
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Dice icon</title>
						<path
							d="M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
							fill="#202733"
						/>
					</svg>
				</button>
			</section>
			<Toaster richColors />
			<Footer author="YeiserBytes" />
		</>
	);
}
