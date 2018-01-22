import { ApolloError } from 'apollo-client/errors/ApolloError';
import { QueryProps } from 'react-apollo/types';
import { MutationFunc } from 'react-apollo';

export type ApiState<T> = {
    loading: boolean,
    error: ApolloError | undefined,
    data: T[]
};

export type ApiProps<D, T, R> = {
    data: D & QueryProps<T>,
    mutate: MutationFunc<R>
};

export const DATE_FORMAT = 'YYYY-MM-DD';