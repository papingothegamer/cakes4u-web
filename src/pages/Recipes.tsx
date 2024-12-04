import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import recipesData from '../data/recipes.json';
import Button from '../components/ui/Button'; // Import Button

interface Recipe {
  id: string;
  name: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
}

interface RecipeCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  recipes: Recipe[];
}

const RecipesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const recipeCategories = recipesData.categories;

  const handleCategoryClick = (category: RecipeCategory) => {
    setSelectedCategory(category);
    setSelectedRecipe(null); // Reset selected recipe when category changes
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-16 flex-grow">
        <h1 className="text-4xl font-bold text-center mt-12 mb-12">Our Cake Recipes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {recipeCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h2 className="text-2xl font-semibold text-white mb-2">{category.name}</h2>
                <p className="text-sm text-white/80">Click to explore recipes</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedCategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-xl p-8 mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">{selectedCategory.name}</h2>
              <p className="text-gray-600 mb-6">{selectedCategory.description}</p>
              <div className="flex overflow-x-auto space-x-4 pb-4">
                {selectedCategory.recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="flex-shrink-0 cursor-pointer"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.name}
                      className="w-32 h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                    />
                    <p className="mt-2 text-center text-sm">{recipe.name}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedRecipe && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
                  <img
                    src={selectedRecipe.image}
                    alt={selectedRecipe.name}
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                  />
                </div>
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h3>
                  <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
                  <h4 className="font-semibold">Ingredients:</h4>
                  <ul className="list-disc list-inside mb-4">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <h4 className="font-semibold">Instructions:</h4>
                  <ol className="list-decimal list-inside mb-4">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                  <p className="text-gray-600">Prep Time: {selectedRecipe.prepTime}</p>
                  <p className="text-gray-600">Cook Time: {selectedRecipe.cookTime}</p>
                  <p className="text-gray-600">Servings: {selectedRecipe.servings}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecipesPage;

