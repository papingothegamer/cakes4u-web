import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Users, ChevronLeft, ChevronRight, Utensils } from 'lucide-react';
import recipesData from '../data/recipes.json';

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

const RecipePage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const foundRecipe = recipesData.categories
      .flatMap(category => category.recipes)
      .find(r => r.id === recipeId);
    
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
  }, [recipeId]);

  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-16">
      <nav className="mb-8 text-sm">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link to="/" className="text-gray-600 hover:text-pink-600">Home</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          </li>
          <li className="flex items-center">
            <Link to="/recipes" className="text-gray-600 hover:text-pink-600">Recipes</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          </li>
          <li className="text-pink-600">{recipe.name}</li>
        </ol>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="relative h-64 sm:h-80 md:h-96">
          <img 
            src={recipe.image} 
            alt={recipe.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center px-4">{recipe.name}</h1>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 md:p-10">
          <p className="text-gray-600 mb-8 text-lg">{recipe.description}</p>
          
          <div className="flex flex-wrap justify-between mb-10 bg-pink-50 p-4 rounded-lg">
            <div className="flex items-center text-gray-700 mb-2 sm:mb-0">
              <Clock className="w-6 h-6 mr-2 text-pink-600" />
              <span>Prep: {recipe.prepTime}</span>
            </div>
            <div className="flex items-center text-gray-700 mb-2 sm:mb-0">
              <Utensils className="w-6 h-6 mr-2 text-pink-600" />
              <span>Cook: {recipe.cookTime}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-6 h-6 mr-2 text-pink-600" />
              <span>{recipe.servings} servings</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-pink-600">Ingredients</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-pink-600 rounded-full mt-2 mr-2"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-pink-600">Instructions</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="font-bold text-pink-600 mr-2">{index + 1}.</span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RecipePage;

