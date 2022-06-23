import Modal from 'react-modal';

type SimpleModalProps = {
	children: JSX.Element;
	modalIsOpen: boolean;
	closeModal: any;
	customStyles?: any;
};

const defaultStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const SimpleModal = ({ children, modalIsOpen, closeModal, customStyles = defaultStyles }: SimpleModalProps) => {
    return (
        <div className='simple-modal-container'>
            <Modal
                isOpen={modalIsOpen}
                // onAfterOpen={afterOpenModal}
                // onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={closeModal} >close</button>
                { children }
            </Modal>
        </div>
    )
}

export default SimpleModal