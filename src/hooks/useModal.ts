import { useSelector, useDispatch } from 'react-redux';
import { setModal } from '../redux/settingsSlice';
import { RootState } from '../redux/store';

export const useModal = () => {
    const modalIsOpen = useSelector((state: RootState) => state.settings.modal)
    const dispatch = useDispatch()
    const closeModal = () => dispatch(setModal(false))

    return {
        modalIsOpen,
        closeModal
    }
}