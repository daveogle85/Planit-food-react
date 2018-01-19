import { graphql } from 'react-apollo';
import { dayCardsRange, addDayCard } from '../api/dayCard';
import * as moment from 'moment';
import { AddDayCardMutatorProps } from '../models/DayCard';

export const fetchDayCardsRange = graphql(dayCardsRange, {
    options: {
        variables: {
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        }
    }
});

export const addDayCardMutator = graphql(addDayCard, {
    props: ({ mutate }) => ({
        addDayCardWithData: (addDayCardProps: AddDayCardMutatorProps) =>
            mutate && mutate({ variables: addDayCardProps })
    })
});
