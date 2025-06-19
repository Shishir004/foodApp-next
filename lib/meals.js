import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import { resolve } from 'styled-jsx/css';
import fs from 'node:fs'

const db= sql('meals.db')

export async function getMeals(){
    await new Promise ((resolve)=>setTimeout(resolve,5000));
    // throw new Error("Loading meals Failed");
    return db.prepare('SELECT * FROM meals').all();
}
export function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}
export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  try {
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const bufferImage = await meal.image.arrayBuffer();
    const stream = fs.createWriteStream(`public/images/${fileName}`);
    stream.write(Buffer.from(bufferImage), (error) => {
      if (error) {
        throw new Error("Error saving image");
      }
    });

    meal.image = `/images/${fileName}`;

    db.prepare(`
      INSERT INTO meals (title, summary, instructions, creator, creator_email, image, slug)
      VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
  } catch (err) {
    console.error("❌ saveMeal error:", err);
    throw err;
  }
}