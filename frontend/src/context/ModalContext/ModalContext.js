// src/context/ModalContext/ModalContext.js
import { createContext, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export default ModalContext;
