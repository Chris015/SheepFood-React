import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";


/*
 TODO:
 1. Förstasidan ska bara visa titel, bild och en liten del av 'description'
    Begränsa details only med en if-sats if(this.props.detailsOnly)
 */

class Recipe extends React.Component {

    render() {
        return (
            <div>
                <h2>{this.props.recipe.title}</h2>
                <img src={this.props.recipe.imageUrl} alt={this.props.recipe.title}/>
                <h3>Ingredienser</h3>
                {
                    this.props.recipe.recipeItems.map((item) =>
                        <li>{item.ingredient.name} {item.amount} {item.unit.name}</li>)
                }
                <h3>Instruktioner</h3>
                <p>{this.props.recipe.description}</p>
            </div>
        )
    }
}


class App extends React.Component {

    constructor() {
        super();
        this.state = {
            recipes: undefined
        };
    }

    componentDidMount() {
        axios.get(`http://sheepfood.azurewebsites.net/recipes.json`)
            .then(
                response => this.setState({recipes: response.data})
            );
    }


    render() {
        if (!this.state.recipes) {
            return <div className="loader"></div>
        } else {
            return (
                <div>
                    <h1>Sheep Food</h1>
                    {
                        this.state.recipes.map((recipe) =>
                            <Recipe recipe={recipe} detailsOnly={true}/>
                        )
                    }
                </div>
            )
        }
    }


}

ReactDOM.render(<App />, document.getElementById('root'));
