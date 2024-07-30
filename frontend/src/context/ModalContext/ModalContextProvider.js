// src/context/ModalContext/ModalContextProvider.js
import React, { useState } from 'react';
import ModalContext from './ModalContext';


export const ModalProvider = ({ children }) => {
    const [showTaskModal, setShowTaskModal] = useState(false);


    const openTaskModal = () => setShowTaskModal(true);
    const closeTaskModal = () => setShowTaskModal(false);

    return (
        <ModalContext.Provider value={{ showTaskModal: showTaskModal, openTaskModal: openTaskModal, closeTaskModal: closeTaskModal }}>
            {children}
        </ModalContext.Provider>
    );
};
