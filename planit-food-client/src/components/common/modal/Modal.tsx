import * as React from 'react';
import { Component } from 'react';
import * as ReactModal from 'react-modal';

import './Modal.css';

type ModalProps = ReactModal.Props & {
    style?: {
        content?: {
            [key: string]: string | number;
        };
        overlay?: {
            [key: string]: string | number;
        };
    };
};

ReactModal.setAppElement('html');

class Modal extends Component<ModalProps> {

    private styles = {
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.555)'
        },
        content: {
            position: 'absolute',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
        }
    };

    public render() {
        return (
            <ReactModal
                className="app-modal"
                {...this.props}
                portalClassName="modal-popup"
                style={this.props.style || this.styles}
            >
                {this.props.children}
            </ReactModal>
        );
    }
}

export default Modal;