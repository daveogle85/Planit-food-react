import { ApolloError } from "apollo-client/errors/ApolloError";
import { QueryProps } from 'react-apollo/types';

export type ApiState<T> = {
    loading: boolean,
    error: ApolloError | undefined,
    data: T[]
}

export type ApiProps<D,T> = {
    data: D & QueryProps<T>
};