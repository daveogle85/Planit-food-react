import * as React from 'react';
import { Component } from 'react';
import { Recipe } from '../../models/Recipes';
import { Link } from 'react-router-dom';

import './Recipes.css';

type RecipesProps = {
    recipes: Recipe[]
};

class Recipes extends Component<RecipesProps> {
    public render() {
        return (

            <div className="Recipes">
                <Link to={'/'} className="nav-link">
                    Go to Home
                </Link>
                <Link to={'calendar'} className="nav-link">
                    Go to Calendar
                </Link>
                <div className="main-content">
                    <h2>Recipes</h2>
                    <ul className="recipe-list">
                        {
                            this.props.recipes.map((r) => (
                                <li key={r.idRecipes}>{r.recipeName}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Recipes;