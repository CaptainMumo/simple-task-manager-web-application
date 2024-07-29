// src/context/ModalContext/ModalContext.js
import React, { createContext, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default ModalContext;
