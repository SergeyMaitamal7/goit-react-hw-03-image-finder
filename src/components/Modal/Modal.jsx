import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Overlay, ModalForm, Imglarge } from './Modal.styled';
export class Modal extends Component {
  static propTypes = {
    largeUrl: PropTypes.string,
    onClose: PropTypes.func,
    onClick: PropTypes.func,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <Overlay onClick={this.handleCloseBackdrop}>
        <ModalForm>
          <Imglarge src={this.props.largeUrl} />
        </ModalForm>
      </Overlay>
    );
  }
}
