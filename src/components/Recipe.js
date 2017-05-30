import React from "react";
import PropTypes from 'prop-types';

export default class Recipe extends React.Component {

    render() {
        const recipe = this.props.recipe;

        if (this.props.detailsOnly) {
            const shortDescription = recipe.description.substring(0, 100) + "...";
            return (
                <div>
                    <h2>{recipe.title}</h2>
                    <img src={recipe.imageUrl} alt={recipe.title}/>
                    <p>{shortDescription}</p>
                </div>
            )
        }

        return (
            <div>
                <h2>{recipe.title}</h2>
                <img src={recipe.imageUrl} alt={recipe.title}/>
                <h3>Ingredienser</h3>
                {
                    recipe.recipeItems.map((item) =>
                        <li>{item.ingredient.name} {item.amount} {item.unit.name}</li>)
                }
                <h3>Instruktioner</h3>
                <p>{recipe.description}</p>
            </div>
        )
    }
}

Recipe.propTypes = {
    recipe: PropTypes.array,
    detailsOnly: PropTypes.bool
};