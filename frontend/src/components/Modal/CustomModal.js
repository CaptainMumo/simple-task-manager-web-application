// src/components/Modal/CustomModal.js
import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';

// Dynamic Custom Modal for new task creation and update and displaying success and error messages
const CustomModal = ({ show, onHide, title, body, footer, autoClose, autoCloseTime }) => {
    useEffect(() => {
        let timer;
        if (show && autoClose) {
            timer = setTimeout(() => {
                onHide();
            }, autoCloseTime || 3000); // Default to 3 seconds if no time is specified
        }
        return () => clearTimeout(timer);
    }, [show, autoClose, autoCloseTime, onHide]);

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            {footer && (
                <Modal.Footer>
                    {footer}
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default CustomModal;
