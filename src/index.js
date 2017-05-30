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
        axios.get('http://sheepfood.azurewebsites.net/recipes?q=' + evt.target.value)
            .then(
                response =>
                    this.setState({recipes: response.data})
            );
    }

    handleViewFullRecipe(recipe){
        this.setState({detailsOnly:false});
        const full= [recipe];
        this.setState({recipe:full})
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

        console.log(this.state.recipes);

        return (
            <div>
                <NavBar onChange={this.handleSearch}/>
                {
                    this.state.recipes.map((recipe) =>
                        <Recipe recipe={recipe} detailsOnly={this.state.detailsOnly}/>
                    )
                }
            </div>
        )

    }


}

ReactDOM.render(<App />, document.getElementById('root'));
