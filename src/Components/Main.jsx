import React from "react";
import Lottie from "lottie-react";
import cookingAnimation from "../assets/cooking-animation.json"; // Correct path
import ClaudeRecipe from "./ClaudeRecipe";
import IngredientList from "./IngredientsList";
import getRecipeFromMistral from "/src/Components/RecipeGenerator.js";

export default function Main() {
    const [ingredients, setIngredients] = React.useState([]);
    const [recipe, setRecipe] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    async function getRecipe() {
        setLoading(true); // Start loading
        const recipeMarkdown = await getRecipeFromMistral(ingredients);
        setRecipe(recipeMarkdown);
        setLoading(false); // Stop loading
    }

    function addIngredient(formData) {
        let newIngredient = formData.get("ingredient");

        if (typeof newIngredient !== "string" || !newIngredient.trim()) {
            return;
        }

        setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()]);
    }

    return (
        <main className="main-container">
            {/* Blurred content when loading */}
            <div className={`content-container ${loading ? "blurred" : ""}`}>
                <form action={addIngredient} className="add-ingredient-form">
                    <input 
                        type="text"
                        placeholder="e.g salt"
                        aria-label="Add Ingredient"
                        name="ingredient" 
                        className="ingredient-input"
                    />
                    <button className="add-ingredient-button">Add Ingredient</button>
                </form>

                {ingredients.length > 0 && (
                    <IngredientList ingredients={ingredients} getRecipe={getRecipe} />
                )}
                
                {recipe && <ClaudeRecipe recipe={recipe} />}
            </div>

           
            {loading && (
                <div className="loading-overlay">
                    <Lottie 
                        animationData={cookingAnimation} 
                        className="custom-loading-animation" 
                        loop={true}
                        autoplay={true} 
                    />
                    <p>Cooking up your recipe...</p>
                </div>
            )}
        </main>
    );
}
