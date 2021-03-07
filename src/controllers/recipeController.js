const { Router } = require('express');
const userService = require('../services/userService');
const recipeService = require('../services/recipeService');

const recipesRouter = new Router();

recipesRouter.post(
  '/',
  userService.verifyToken,
  recipeService.verifyFields,
  async (req, res) => {
    const recipe = req.body;
    const { authorization } = req.headers;

    const { _id } = await userService.decodeToken(authorization);

    recipe.userId = _id;

    const createdRecipe = await recipeService.createRecipe(recipe);

    res.status(201).json({ recipe: createdRecipe });
  },
);

module.exports = { recipesRouter };