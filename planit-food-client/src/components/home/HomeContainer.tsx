import * as React from 'react';
import { Component } from 'react';
import Home from './Home';
import { graphql } from 'react-apollo';
import { allDayCards } from '../../api/dayCard';
import { DayCard } from '../../models/DayCard';
import { ApiProps, ApiState } from '../../models/Api';

type HomeContainerProps = ApiProps<{ getDayCards: DayCard[] }, DayCard, DayCard>;

class HomeContainer extends Component<HomeContainerProps, ApiState<DayCard>> {

    public constructor(props: HomeContainerProps) {
        super(props);
        this.state = {
            data: props.data.getDayCards,
            error: props.data.error,
            loading: props.data.loading
        };
    }

    public componentWillReceiveProps(nextProps: HomeContainerProps) {
        this.setState({
            data: nextProps.data.getDayCards,
            error: nextProps.data.error,
            loading: nextProps.data.loading
        });
    }

    public render() {
        return (
            <Home
                days={this.state.data}
            />
        );
    }
}

export default graphql(allDayCards)(HomeContainer);