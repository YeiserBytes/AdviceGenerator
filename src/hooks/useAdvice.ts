import { useCallback, useEffect, useState } from "react";
import type { Advice } from "../types/advices";

const ADVICE_URL = "https://api.adviceslip.com/advice";

export default function useAdvice() {
	const [advice, setAdvice] = useState<string>("");
	const [adviceId, setAdviceId] = useState<number>(117);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const generateRandomInt = useCallback((min: number, max: number): number => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}, []);

	const getAdvice = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(`${ADVICE_URL}/${adviceId}`);
			if (!response.ok) {
				throw new Error(
					`Failed to fetch advice: ${response.status} ${response.statusText}`,
				);
			}
			const data: Advice = await response.json();
			setAdvice(data.slip.advice);
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "An unknown error occurred.",
			);
		} finally {
			setIsLoading(false);
		}
	}, [adviceId]);

	useEffect(() => {
		getAdvice();
	}, [getAdvice]);

	const handleClick = useCallback(() => {
		setAdviceId(generateRandomInt(1, 224));
	}, [generateRandomInt]);

	return {
		advice,
		adviceId,
		handleClick,
		isLoading,
		error,
	};
}
