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
            recipes: [
                {
                    title: '',
                    description: '',
                    imageUrl: '',
                    recipeItems: [
                        {
                            id: null,
                            ingredient: {name: ''},
                            amount: null,
                            unit: {name: ""}
                        }
                    ]

                }
            ],
            mockRecipes: [
                {
                    title: 'Title',
                    description: 'Description',
                    imageUrl: 'img_url',
                    recipeItems: [
                        {
                            id: 1,
                            ingredient: {name: 'Mjöl'},
                            amount: 3,
                            unit: {name: "dl"}
                        },
                        {
                            id: 2,
                            ingredient: {name: 'Salt'},
                            amount: 2,
                            unit: {name: "krm"}
                        }
                    ]

                }
            ]
        };
    }

    componentDidMount() {
        axios.get(`http://sheepfood.azurewebsites.net/recipes.json`)
            .then(
                response => this.setState({recipes: response.data})
            );
    }

    render() {
        console.log(this.state.recipes);

        const recipes = this.state.recipes.map((recipe) =>
            <div>
                <h2>{recipe.title}</h2>
                <img src={recipe.imageUrl} alt={recipe.title}/>
                <h3>Ingredienser</h3>
                {
                    recipe.recipeItems.map((item) =>
                        <li>{item.ingredient.name} {item.amount} {item.unit.name}</li>)
                }
                <h3>Insruktioner</h3>
                <p>{recipe.description}</p>
            </div>
        );


        return (
            <div>
                <h1>Hello World!</h1>
                {recipes}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
