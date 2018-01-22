import { graphql } from 'react-apollo';
import { dayCardsRange } from '../api/dayCard';
import * as moment from 'moment';

export const fetchDayCardsRange = graphql(dayCardsRange, {
    options: {
        variables: {
            startDate: moment().startOf('month'),
            endDate: moment().endOf('month')
        }
    }
});
