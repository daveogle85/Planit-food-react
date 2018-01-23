import * as React from 'react';
import { Component } from 'react';
import Recipes from './Recipes';

class RecipesContainer extends Component {

    // public constructor(props: HomeContainerProps) {
    //     super(props);
    //     this.state = {
    //         data: props.data.getDayCards,
    //         error: props.data.error,
    //         loading: props.data.loading
    //     };
    // }

    public render() {
        return (
            <Recipes />
        );
    }
}

export default RecipesContainer;