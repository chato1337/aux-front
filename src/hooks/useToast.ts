import { ToastContainer, toast } from 'react-toastify';

export const useToast = () => {
    const notify = (msg: string) => toast(msg)
    const notifyError = (msg: string) => toast.error(msg)

    return {
        GeneralToast: ToastContainer,
        notify,
        notifyError
    }
}