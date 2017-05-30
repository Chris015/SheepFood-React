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
        this.fetchAllRecipes();
    }

    fetchAllRecipes() {
        axios.get('http://sheepfood.azurewebsites.net/recipes.json')
            .then(
                response => this.setState({recipes: response.data})
            );
    }

    handleSearch(evt) {
        axios.get('http://sheepfood.azurewebsites.net/recipes?q=' + evt.target.value)
            .then(
                response => {
                    if (response.status === 204) {
                        this.setState({
                            recipes: [],
                            detailsOnly: true
                        })
                    } else {
                        this.setState({
                            recipes: response.data,
                            detailsOnly: true
                        })
                    }
                }
            );
    }

    handleViewFullRecipe(recipe) {
        console.log("HANDLE FULL VIEW");
        console.log(recipe);
        this.setState({detailsOnly: false});
        const full = [recipe];
        this.setState({recipes: full})
    }


    render() {
        if (!this.state.recipes) {
            return (
                <div>
                    <NavBar
                        handleChange={this.handleSearch.bind(this)}
                        handleClick={this.fetchAllRecipes.bind(this)}/>
                    <div className="loader-content">
                        <div className="loader-icon"/>
                        <p>loading recipes...</p>
                    </div>
                </div>
            )
        }

        if(this.state.recipes.length === 0) {

            return (
                <div>
                    <NavBar
                        handleChange={this.handleSearch.bind(this)}
                        handleClick={this.fetchAllRecipes.bind(this)}/>
                    <div className="col-md-offset-5">
                        <img src="http://cdn.toonvectors.com/images/2/19936/toonvectors-19936-140.jpg"/>
                        <p>Vi hittade inga recept åt dig</p>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <NavBar
                    handleChange={this.handleSearch.bind(this)}
                    handleClick={this.fetchAllRecipes.bind(this)}/>
                {

                    this.state.recipes.map((recipe) =>
                        <Recipe
                            recipe={recipe}
                            detailsOnly={this.state.detailsOnly}
                            handleClick={this.handleViewFullRecipe.bind(this)}/>
                    )
                }
            </div>
        )

    }


}

ReactDOM.render(<App />, document.getElementById('root'));
