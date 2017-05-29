import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";


/*
 TODO:
 1. Förstasidan ska bara visa titel, bild och en liten del av 'description'
 2. Loopa igenom listan med recept, och skapa recept-klasser
 2.2 Skicka in information om receptet visa props t.ex <Recipe details = {recipeObjektet}/>

 Jag har inte tänkt igenom hur man begränsar vad man ska visa på framsidan jämfört när man klickar på ett recept.
 Vi får kanske skapa två typer av klasser. En som visar bara lite grann (framsidan) och en klass som visar allt (detaljvyn)
 */


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

    generateRecipesJsx() {
        return this.state.recipes.map((recipe) =>
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
        );

    }

    render() {
        if (!this.state.recipes) {
            return <div className="loader"></div>
        } else {
            const recipes = this.generateRecipesJsx();
            return (
                <div>
                    <h1>Sheep Food</h1>
                    {recipes}
                </div>
            )
        }
    }


}

ReactDOM.render(<App />, document.getElementById('root'));
