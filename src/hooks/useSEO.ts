import { useEffect } from "react";

interface SEOProps {
	title: string;
	description: string;
}

export default function useSEO({ title, description }: SEOProps) {
	useEffect(() => {
		// Update the document title
		document.title = title;

		// Ensure the meta description tag exists or create it
		let metaDescription = document.querySelector('meta[name="description"]');
		if (!metaDescription) {
			metaDescription = document.createElement("meta");
			(metaDescription as HTMLMetaElement).name = "description";
			document.head.appendChild(metaDescription);
		}

		// Update the meta description content
		metaDescription.setAttribute("content", description);
	}, [title, description]);
}
