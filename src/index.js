import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import Recipe from "./components/Recipe.js";


/*
 TODO:
  1. Meny
  2. Söka efter recept
  3. Klickbara recept som visar hela receptet
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


    render() {
        if (!this.state.recipes) {
            return (
                <div className="loader-content">
                    <div className="loader-icon"/>
                    <p>loading recipes...</p>
                </div>
            )
        }

        return (
            <div>
                <h1>Sheep Food</h1>
                {
                    this.state.recipes.map((recipe) =>
                        <Recipe recipe={recipe} detailsOnly={false}/>
                    )
                }
            </div>
        )

    }


}

ReactDOM.render(<App />, document.getElementById('root'));
