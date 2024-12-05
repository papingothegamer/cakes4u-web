import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import recipesData from '../data/recipes.json';
import RecipeCard from '../components/recipe-ui/recipeCard';

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const recipeCategories: RecipeCategory[] = recipesData.categories;

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Our Cake Recipes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {recipeCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => {
              setSelectedCategory(category);
              setIsDropdownOpen(true);
            }}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={category.image}
                alt={category.name}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">{category.name}</h2>
              <p className="text-sm text-white/80">{category.description}</p>
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
            className="bg-white rounded-2xl shadow-xl mt-12 overflow-hidden"
          >
            <div
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-6 cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{selectedCategory.name}</h2>
                <ChevronDown
                  className={`transform transition-transform duration-300 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </div>
              <p className="text-white/80 mt-2">{selectedCategory.description}</p>
            </div>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {selectedCategory.recipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RecipesPage;

