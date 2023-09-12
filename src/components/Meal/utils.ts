import { Meal } from ".prisma/client";

export const deleteMeal = async (id: Meal["id"]) => {
	const res = await fetch("http://localhost:3000/api/meals", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id }),
	});

	if (!res.ok) {
		throw new Error("Failed to delete meal");
	}

	return res.json() as Promise<{ meal: Meal }>;
};

export const createMeal = async (meal: Omit<Meal, "id">) => {
	const res = await fetch("http://localhost:3000/api/meals", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(meal),
	});

	if (!res.ok) {
		throw new Error("Failed to create meal");
	}

	return res.json() as Promise<{ meal: Meal }>;
};

export const updateMeal = async (meal: Meal) => {
	const res = await fetch("http://localhost:3000/api/meals", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(meal),
	});

	if (!res.ok) {
		throw new Error("Failed to update meal");
	}

	return res.json() as Promise<{ meal: Meal }>;
};
