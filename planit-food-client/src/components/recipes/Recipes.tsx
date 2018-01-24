import * as React from 'react';
import { Component } from 'react';
import { Recipe } from '../../models/Recipes';
import { Link } from 'react-router-dom';
import Search from '../common/search/Search';

import './Recipes.css';

type RecipesProps = {
    recipes: Recipe[]
    filterRecipes: (contains: string) => void
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
                    <Search
                        onFilterClick={this.props.filterRecipes}
                    />
                    <ul className="recipe-list">
                        {
                            this.props.recipes.map((r) => (
                                <li key={r.idRecipes}>{r.recipeName}
                                    {r.tags && r.tags.map((t, i) => (
                                        <div
                                            key={i.toString() + t.idTag}
                                            className={'tag'}
                                            data-colour={t.tagColour}
                                        >{t.tagName}
                                        </div>
                                    ))}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Recipes;