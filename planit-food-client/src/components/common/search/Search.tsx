import * as React from 'react';
import { Component } from 'react';

import './Search.css';

type SearchState = {
    value: string,
    className: string
};

type SearchProps = {
    onFilterClick: (value: string) => void
};

class Search extends Component<SearchProps, SearchState> {

    private input: HTMLInputElement;

    public constructor(props: SearchProps) {
        super(props);
        this.state = {
            value: '',
            className: ''
        };
    }

    public render() {
        return (
            <div className={`${this.state.className}Search`}>
                <form onSubmit={this.onSubmit}>
                    <input
                        value={this.state.value}
                        placeholder="Filter..."
                        ref={(el: HTMLInputElement) => this.input = el}
                        onChange={() => this.setState({
                            value: this.input && this.input.value
                        })}
                        onFocus={() => this.setState({ className: 'focused ' })}
                        onBlur={() => this.setState({ className: '' })}
                    />
                    <button
                        className="filter-button"
                        type="submit"
                        onClick={() => this.props.onFilterClick(this.state.value)}
                    >
                        Filter
                    </button>
                </form>
            </div>
        );
    }

    private onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onFilterClick(this.state.value);
    }
}

export default Search;