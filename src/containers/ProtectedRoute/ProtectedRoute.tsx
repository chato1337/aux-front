import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { AccountService } from '../../services/AccountService';
import { setToken, setLogged, setOrganization } from '../../redux/accountSlice';
import { USER_STATUS } from '../../models/User.model.d';

type ProtectedRouterProps = {
    children: JSX.Element
    redirectPath?: string,
}

const ProtectedRoute = ({
    redirectPath = '/login',
    children
}: ProtectedRouterProps) => {
    const staff = useSelector((state: RootState) => state.account.logged)
    const dispatch = useDispatch()

    // restore session from local storage
    useEffect(() => {
        if (AccountService.getUser()) {
            dispatch(setLogged(AccountService.getUser()))
        }
    }, [dispatch])

    useEffect(() => {
        if (AccountService.getToken()) {
            dispatch(setToken(AccountService.getToken()))
        }
    }, [dispatch])

    useEffect(() => {
        if (AccountService.getOrganization()) {
            dispatch(setOrganization(AccountService.getOrganization()))
        }
    }, [dispatch])

    if (staff && staff.user.status !== USER_STATUS.to_activate) {
        return children
    }else {
        return <Navigate to={redirectPath} replace />
    }
}

export default ProtectedRoute
