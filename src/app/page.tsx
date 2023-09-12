import { Meal } from ".prisma/client";
import styles from "./page.module.css";

import MealComponent from "@/components/Meal";

async function getData() {
	const res = await fetch("http://localhost:3000/api/meals");

	if (!res.ok) {
		throw new Error("Failed to fetch data");
	}

	return res.json() as Promise<{ meals: Meal[] }>;
}

export default async function Home() {
	const { meals } = await getData();

	return (
		<main className={styles.main}>
			<div className={styles.meals}>
				{meals.map((meal) => (
					<MealComponent key={meal.id} meal={meal} />
				))}
				<MealComponent isNew />
			</div>
		</main>
	);
}

export const revalidate = 60;
