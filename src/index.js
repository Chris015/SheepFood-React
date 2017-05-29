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
            recipes: [{}]
        };
    }

    componentDidMount() {
        axios.get(`http://sheepfood.azurewebsites.net/recipes.json`)
            .then(
                response => this.setState({recipes: response.data})
            );
    }

    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                <h2>{this.state.recipes[0].title}</h2>
                <img src={this.state.recipes[0].imageUrl} alt={this.state.recipes[0].title}/>
                <h3>Ingredienser</h3>
                <h3>Insruktioner</h3>
                <p>{this.state.recipes[0].description}</p>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
