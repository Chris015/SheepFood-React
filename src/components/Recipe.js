import React from "react";
import PropTypes from "prop-types";


export default function Recipe(props) {

    if (props.detailsOnly) {
        const shortDescription = props.recipe.description.substring(0, 100) + "...";
        return (
            <div className="col-md-offset-1" onClick={evt => props.handleClick(props.recipe)}>
                <h2>{props.recipe.title}</h2>

                    <img src={props.recipe.imageUrl} alt={props.recipe.title} width={200} />

                <p>{shortDescription}</p>
            </div>

        )
    }

    return (
        <div className="col-md-offset-1">
            <h2>{props.recipe.title}</h2>
            <img src={props.recipe.imageUrl} alt={props.recipe.title}/>
            <h3>Ingredienser</h3>
            {
                props.recipe.recipeItems.map((item) =>
                    <li>{item.amount} {item.unit.name} {item.ingredient.name.toLowerCase()}</li>)
            }
            <h3>Instruktioner</h3>
            <div className="col-md-5">
                <p>{props.recipe.description}</p>
            </div>
        </div>
    )
}


Recipe.propTypes = {
    recipe: PropTypes.array,
    detailsOnly: PropTypes.bool
};