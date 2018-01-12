import * as React from 'react';
import { Component, MouseEvent } from 'react';

import './MealItem.css';

interface MealItemProps {
    id: number | string;
    value: string;
    onEditSubmit: (newValue: string) => void;
    onDelete: (id: number | string) => void;
    isEditing?: boolean;
}

interface MealItemState {
    isEditing: boolean;
    value: string;
}

class MealItem extends Component<MealItemProps, MealItemState> {

    private input: HTMLInputElement;

    public constructor(props: MealItemProps) {
        super(props);
        this.state = {
            isEditing: !!props.isEditing,
            value: this.props.value
        };
    }

    public render() {
        return (
            <li className="MealItem">
                <span>
                    <input
                        ref={(el: HTMLInputElement) => this.input = el}
                        disabled={!this.state.isEditing}
                        className={`meal-input ${this.state.isEditing ? 'editing' : ''}`}
                        type="text"
                        value={this.state.value}
                        onChange={() => this.input && this.setState({ value: this.input.value })}
                    />
                    <button className="edit-button" onClick={this.onEditClicked}>
                        {this.state.isEditing ? 'Accept' : 'Edit'}
                    </button>
                    <button className="delete-button" onClick={this.onDeleteClicked}>X</button>
                </span>
            </li>
        );
    }

    private onEditClicked = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (this.state.isEditing) {
            this.setState({ isEditing: false });
            return this.props.onEditSubmit(this.state.value);
        }
        this.setState({ isEditing: true });
    }

    private onDeleteClicked = (e: MouseEvent<HTMLButtonElement>) =>
        e.preventDefault() &&
        this.props.onDelete(this.props.id)
}

export default MealItem;