import { ToastContainer, toast } from 'react-toastify';

export const useToast = () => {
    const notify = (msg: string) => toast(msg)

    return {
        GeneralToast: ToastContainer,
        notify
    }
}