"use client";
import { useForm } from "react-hook-form";
import { Meal } from ".prisma/client";
import styles from "./meal.module.css";
import { createMeal, deleteMeal, updateMeal } from "./utils";
import { useDebounce } from "@/hooks/useDebounce";

type MealProps =
	| {
			meal?: never;
			isNew: true;
	  }
	| {
			meal: Meal;
			isNew?: false;
	  };

const Meal = ({ meal, isNew }: MealProps) => {
	const {
		formState: { errors },
		handleSubmit: handleFormSubmit,
		register,
		getValues,
	} = useForm<Omit<Meal, "id">>({
		values: meal,
	});

	const debouncedOnChange = useDebounce(async () => {
		if (isNew) return;

		await updateMeal({
			...getValues(),
			id: meal.id,
		});
	}, 200);

	return (
		<div className={styles.meal}>
			{!isNew && (
				<button
					className={styles.delete}
					onClick={(event) => {
						event.preventDefault();

						if (window.confirm("Are you sure you want to delete this meal?")) {
							deleteMeal(meal.id);
						}
					}}
				>
					X<span className={styles.hidden}>Delete</span>
				</button>
			)}
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					if (!isNew) return;

					await createMeal(getValues());
				}}
				onChange={() => {
					debouncedOnChange();
				}}
			>
				<input className={styles.emoji} type="text" {...register("emoji")} />
				{errors.emoji && <span>{errors.emoji.message}</span>}
				<input className={styles.title} type="text" {...register("title")} />
				{errors.title && <span>{errors.title.message}</span>}
				<input type="text" {...register("content")} />
				{errors.content && <span>{errors.content.message}</span>}
				{isNew && (
					<div>
						<button type="submit">Create</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default Meal;
