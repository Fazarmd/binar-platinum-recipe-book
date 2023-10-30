import { responseOk, responseError } from "../../helpers/restResponse.helper.js";
import CookBookModels from "../../models/recipe.models.js";

const models = new CookBookModels();

async function getRecipesByUser(req, res) {
  try {
    const userId = req.local_user; // Assuming you have a way to extract the user ID from the authentication middleware.

    // Fetch recipes associated with the user ID from your database.
    const userRecipes = await models.getUserRecipes(userId);

    return res.status(200).json(responseOk("User-specific recipes fetched successfully", userRecipes));
  } catch (error) {
    console.error("Error fetching user-specific recipes: ", error);
    return res.status(500).json(responseError("Error fetching user-specific recipes"));
  }
}

export { getRecipesByUser };
