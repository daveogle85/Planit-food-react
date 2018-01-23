import * as React from 'react';
import { Component } from 'react';
import Recipes from './Recipes';
import { ApiState } from '../../models/Api';
import { Recipe, RecipesContainerProps } from '../../models/Recipes';
import { compose } from 'react-apollo';
import { fetchRecipes } from '../../enhancers/recipe';

type RecipesState = ApiState<Recipe>;

class RecipesContainer extends Component<RecipesContainerProps, RecipesState> {

    public constructor(props: RecipesContainerProps) {
        super(props);
        this.state = {
            data: props.data.getRecipes,
            error: props.data.error,
            loading: props.data.loading
        };
    }

    public componentWillReceiveProps(nextProps: RecipesContainerProps) {
        this.setState({
            data: nextProps.data.getRecipes,
            error: nextProps.data.error,
            loading: nextProps.data.loading
        });
    }

    public render() {
        return (
            <Recipes recipes={this.state.data || []}/>
        );
    }
}

export default compose(fetchRecipes)(RecipesContainer);