import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import Recipe from "./components/Recipe.js";
import NavBar from "./components/NavBar.js";


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
            recipes: undefined,
            detailsOnly: true
        };
    }

    componentDidMount() {
        axios.get('http://sheepfood.azurewebsites.net/recipes.json')
            .then(
                response => this.setState({recipes: response.data})
            );
    }

    handleSearch(evt) {
        console.log(this.state.recipes);
        axios.get('http://sheepfood.azurewebsites.net/recipes?q=' + evt.target.value)
            .then(
                response => this.setState({recipes: response.data}),
            );
    }

    handleViewFullRecipe(evt){
        console.log("hello");
        // this.setState({detailsOnly:false});
        // const full= [evt.target.recipe];
        // this.setState({recipe:full})
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
                <NavBar handleChange={this.handleSearch.bind(this)}/>
                {
                    this.state.recipes.map((recipe) =>
                        <Recipe
                            recipe={recipe}
                            detailsOnly={this.state.detailsOnly}
                            handleClick={this.handleViewFullRecipe.bind(this)} />
                    )
                }
            </div>
        )

    }


}

ReactDOM.render(<App />, document.getElementById('root'));
