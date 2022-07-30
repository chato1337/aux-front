import { BiArrowToTop, BiArrowToBottom } from 'react-icons/bi'
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../../redux/settingsSlice'
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import './Ordering.styles.scss'

type OrderingProps = {
    orderField: string,
    children: JSX.Element
}

const Ordering = ({ orderField, children }: OrderingProps) => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const order = useSelector((state:RootState) => state.settings.order)
    const matchSymbol = order.match(/-/g)
    const withoutSymbol = order.replace(/-/g, "")
    const isSelected = orderField === order || order === `-${orderField}`
    const isEnabled = withoutSymbol === orderField

    const handleToggle = () => {
        if(matchSymbol){
            dispatch(setOrder(withoutSymbol))
        }else {
            dispatch(setOrder("-"+order))
        }
    }

    const handleChangeOrder = (orderName: string) => {
        dispatch(setOrder(orderName))
    }

    useEffect(() => {
        // prevent unnecesaries requests
        if(isEnabled){
            queryClient.refetchQueries()
        }
    }, [queryClient, order, isEnabled])

	return (
        <div>
            <button className={`toggle-btn btn ${ isSelected ? 'btn-primary' : 'btn-outline' }`} onClick={() => handleChangeOrder(orderField)}>
                { children }
            </button>
            <button disabled={!isEnabled} onClick={handleToggle}>
                { matchSymbol && withoutSymbol === orderField ? <BiArrowToBottom /> : <BiArrowToTop /> }
            </button>
        </div>
	);
}

export default Ordering