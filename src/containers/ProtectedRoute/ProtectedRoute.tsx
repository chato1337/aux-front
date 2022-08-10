import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
// import { RootState } from '../../app/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import { AccountService } from '../../services/AccountService';
import { setToken, setUser } from '../../redux/accountSlice';
import { USER_STATUS } from '../../models/User.model.d';

type ProtectedRouterProps = {
    children: JSX.Element
    redirectPath?: string,
}

const ProtectedRoute = ({
    redirectPath = '/login',
    children
}: ProtectedRouterProps) => {
    const user = useSelector((state: RootState) => state.account.user)
    const dispatch = useDispatch()

    // restore session from local storage
    useEffect(() => {
        if (AccountService.getUser()) {
            dispatch(setUser(AccountService.getUser()))
        }
    }, [dispatch])

    useEffect(() => {
        if (AccountService.getToken()) {
            dispatch(setToken(AccountService.getToken()))
        }
    }, [dispatch])

    if (user && user.status !== USER_STATUS.to_activate) {
        return children
    }else {
        return <Navigate to={redirectPath} replace />
    }
}

export default ProtectedRoute
