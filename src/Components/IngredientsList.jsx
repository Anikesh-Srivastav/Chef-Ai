export default function IngredientList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient} className="ingredient-item">{ingredient}</li>
    ));

    return (
        <section className="ingredients-container">
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite">
                {ingredientsListItems}
            </ul>
            {props.ingredients.length > 3 && (
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready For a Recipe?</h3>
                        <p>Generate a recipe from your list of Ingredients</p>
                        <button className="get-recipe-button" onClick={props.getRecipe}>
                            Get a recipe
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
