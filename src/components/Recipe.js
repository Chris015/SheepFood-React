import React from "react";
import PropTypes from "prop-types";


export default function Recipe(props) {

    if (props.detailsOnly) {
        const shortDescription = props.recipe.description.substring(0, 100) + "...";
        return (
            <div onClick={evt => props.handleClick(props.recipe)}>
                <h2>{props.recipe.title}</h2>
                <img src={props.recipe.imageUrl} alt={props.recipe.title} />
                <p>{shortDescription}</p>
            </div>
        )
    }

    return (
        <div>
            <h2>{props.recipe.title}</h2>
            <img src={props.recipe.imageUrl} alt={props.recipe.title}/>
            <h3>Ingredienser</h3>
            {
                props.recipe.recipeItems.map((item) =>
                    <li>{item.amount} {item.unit.name} {item.ingredient.name.toLowerCase()}</li>)
            }
            <h3>Instruktioner</h3>
            <p>{props.recipe.description}</p>
        </div>
    )
}


Recipe.propTypes = {
    recipe: PropTypes.array,
    detailsOnly: PropTypes.bool
};