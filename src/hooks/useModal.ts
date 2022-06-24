
import { useState } from 'react';

export const useModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const closeModal = () => setModalIsOpen(false)

    return {
        modalIsOpen,
        setModalIsOpen,
        closeModal
    }
}