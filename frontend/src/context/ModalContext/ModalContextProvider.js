// src/context/ModalContext/ModalContextProvider.js
import React, { useState } from 'react';
import ModalContext from './ModalContext';


export const ModalProvider = ({ children }) => {
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);


    const openNewTaskModal = () => setShowNewTaskModal(true);
    const closeNewTaskModal = () => setShowNewTaskModal(false);

    return (
        <ModalContext.Provider value={{ showNewTaskModal, openNewTaskModal, closeNewTaskModal }}>
            {children}
        </ModalContext.Provider>
    );
};
