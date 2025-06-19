import React, { Suspense } from 'react';
import classes from './meals.module.css';
import Link from 'next/link';
import { getMeals } from '@/lib/meals';
import MealItem from '../components/meals/mealItem';

export const metadata = {
  title: 'all meals ',
  description: 'meals shared by our community.',
};

async function Foods(){
  const meals=await getMeals();
  return meals.map((meal) => (
          <MealItem
            key={meal.slug}
            title={meal.title}
            slug={meal.slug}
            image={meal.image}
            summary={meal.summary}
            creator={meal.creator}
          />
        ))
}
const Meals = () => {

  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicious Meals Shared <span className={classes.highlight}>By You</span>
        </h1>
        <p>Choose Your Favourite Recipe And Cook It Yourself</p>
        <p className={classes.cta}>
          <Link href='/meals/share'>Share Your Favourite Recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<div className={classes.loading}>loading</div>}>
          <Foods/>
        </Suspense>
      </main>
    </>
  );
};

export default Meals;
