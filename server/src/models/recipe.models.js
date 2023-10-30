import db from "../config/db.js";
import { v4 } from "uuid";

class RecipeModels {
  //Post addRecipes
  async insert(
    title,
    ingredients,
    instruction,
    caption,
    category,
    imageFilename,
    userId // Parameter ID pengguna
  ) {
    const newRecipe = {
      id: v4(),
      user_id: userId, // Gunakan ID pengguna yang sudah login
      title,
      ingredients,
      instruction,
      caption,
      category,
      img_filename: imageFilename,
    };
    return await db.insert(newRecipe).into("recipe").returning("*");
  }

  //Get getRecipes
  async findAll() {
    const query = await db.select("*").table("recipe");
    return query;
    // return this.recipesData;
  }

  //Get getRecipesById
  async findById(id) {
    const resp = await db.select("*").table("recipe").where({ id });
    if (resp.length > 0) {
      return resp[0];
    }
    return null;
  }

  //Delete deleteRecipesById
  async delete(id) {
    return await db.del().table("recipe").where({ id });
  }

  //Update editRecipesById
  async edit(id, body) {
    return await db.update(body).table("recipe").where({ id }).returning("*");
  }

  //Get Recipes by User
  async getUserRecipes(userId) {
    const userRecipes = await db.select("*").from("recipe").where("user_id", userId);
    return userRecipes;
  }
}

export default RecipeModels;
