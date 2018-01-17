import * as React from 'react';
import { Component } from 'react';
import Calendar from './Calendar';
import { graphql } from 'react-apollo';
import { DayCard } from '../../models/DayCard';
import { ApiProps, ApiState } from '../../models/Api';
import * as moment from 'moment';
import { Moment } from 'moment';
import { dayCardsRange } from '../../api/dayCard';

type queryVariables = { startDate: Moment, endDate: Moment };
type CalendarContainerProps = ApiProps<{ DayCards: DayCard[] }, queryVariables>;
type CalendarState = ApiState<DayCard> & { date: Moment };

class CalendarContainer extends Component<CalendarContainerProps, CalendarState> {

    public constructor(props: CalendarContainerProps) {
        super(props);
        this.state = {
            data: props.data.DayCards,
            error: props.data.error,
            loading: props.data.loading,
            date: moment()
        };
    }

    public componentWillReceiveProps(nextProps: CalendarContainerProps) {
        this.setState({
            data: nextProps.data.DayCards,
            error: nextProps.data.error,
            loading: nextProps.data.loading
        });
    }

    public render() {
        return (
            <Calendar
                refetch={this.refetch}
                events={this.state.data && this.state.data.map((card) => ({
                    title: card.meal_name,
                    allDay: true,
                    start: moment(card.meal_date),
                    end: moment(card.meal_date),
                    desc: 'Something here'
                }))}
            />
        );
    }

    private refetch = (variables: queryVariables) => {
        this.props.data.refetch(variables).then((res) => this.setState({
            data: res.data.DayCards,
            error: res.data.error,
            loading: res.data.loading
        }));
    }
}

export default graphql(dayCardsRange, {
    options: {
        variables: {
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        }
    }
})(CalendarContainer);