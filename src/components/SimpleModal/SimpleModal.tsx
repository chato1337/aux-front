import Modal from 'react-modal';
import './SimpleModal.styles.scss'

type SimpleModalProps = {
	children: JSX.Element;
	modalIsOpen: boolean;
	closeModal: any;
	customStyles?: any;
};

const defaultStyles = {
    content: {
        padding: 0,
        height: 'fit-content'
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
                ariaHideApp={false}
            >
                <div className="modal-content">
                    <button className='close-button' onClick={closeModal} >close</button>
                    <div className="modal-inner">
                        { children }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SimpleModal