import React from "react";
import { Clock, Users } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: {
    id: string;
    name: string;
    description: string;
    image: string;
    prepTime: string;
    cookTime: string;
    servings: number;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipe/${recipe.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer flex flex-col bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 max-w-xs"
    >
      {/* Recipe Image */}
      <div className="relative w-full aspect-video bg-gray-100">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Recipe Info */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="line-clamp-2 text-base font-semibold text-gray-800 mb-1">
          {recipe.name}
        </h3>
        <p className="text-xs text-gray-600 mb-2 flex-grow line-clamp-2">
          {recipe.description}
        </p>
        <div className="flex flex-col text-xs text-gray-500 space-y-1">
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{recipe.prepTime} + {recipe.cookTime}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1" />
            <span>{recipe.servings} servings</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;

