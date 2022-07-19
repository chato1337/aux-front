import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '../../hooks/useToast';

export const ToastWrapper = () => {
    const { GeneralToast } = useToast()
    
    return <GeneralToast />;
}