import express from "express";
import { addRecipes, deleteRecipesById, editRecipesById, getRecipes, getRecipesById, getRecipesByUser } from "../controllers/recipe.controllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
const prefixPath = "api/v1/recipebook";
// #swagger.tags = ['Recipe']
router.get(`/${prefixPath}/recipes`, getRecipes);
router.get(`/${prefixPath}/recipes/:id`, getRecipesById);
router.get(`/${prefixPath}/user-recipes`, authMiddleware, getRecipesByUser);
router.post(`/${prefixPath}/add`, authMiddleware, addRecipes);
router.put(`/${prefixPath}/edit/:id`, editRecipesById);
router.delete(`/${prefixPath}/delete/:id`, deleteRecipesById);

export default router;
