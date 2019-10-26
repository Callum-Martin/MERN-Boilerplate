import React, { Fragment, useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CustomModal = props => {
  const [visible, setIsVisible] = useState(false);

  const toggle = () => {
    setIsVisible(current => !current);
  };

  const submitHandler = e => {
    const valid = props.onSubmit(e);
    if (valid) toggle();
  };

  return (
    <Fragment>
      <button {...props.openButton} onClick={toggle}>
        {props.openButtonText}
      </button>
      <Modal isOpen={visible} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.modalTitle}</ModalHeader>
        <form onSubmit={submitHandler}>
          <ModalBody>{props.children}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>
              Nevermind
            </Button>
            <button {...props.submitButton}>{props.submitButtonText}</button>
          </ModalFooter>
        </form>
      </Modal>
    </Fragment>
  );
};

export default CustomModal;
