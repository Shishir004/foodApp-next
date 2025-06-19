'use server';

import { redirect } from 'next/navigation';
import { saveMeal } from './meals';
import { revalidatePath } from 'next/cache';

function helperValid(text) {
  return !text || text.trim() === '';
}

export const shareMeal = async (prevState, formData) => {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    helperValid(meal.title) ||
    helperValid(meal.summary) ||
    helperValid(meal.instructions) ||
    helperValid(meal.creator) ||
    helperValid(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid Input',
    };
  }

  try {
    await saveMeal(meal);
    revalidatePath('/meals');

    return {
      message: 'Meal uploaded successfully!',
    };

    // ❌ Avoid this line if using useActionState
  } catch (error) {
    console.error("❌ Error in shareMeal:", error);
    return {
      message: 'Failed to upload meals',
    };
  }
};
