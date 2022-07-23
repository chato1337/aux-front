import { useState } from 'react'
import { BiArrowToTop, BiArrowToBottom } from 'react-icons/bi'
import { useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { setOrder } from '../../redux/settingsSlice'
import { useEffect } from 'react';
import { RootState } from '../../redux/store';
import './Ordering.styles.scss'

type OrderingProps = {
    orderField: string
}

const Ordering = ({ orderField }: OrderingProps) => {
    const [ orderToggle, setOrderToggle ] = useState(true)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const order = useSelector((state:RootState) => state.settings.order)
    const isSelected = orderField === order || order === `-${orderField}`

    const handleToggle = () => {
        setOrderToggle(!orderToggle)
    }

    useEffect(() => {
        if (orderToggle) {
            dispatch(setOrder(orderField))
        }else {
            dispatch(setOrder("-"+orderField))
        }
    }, [orderToggle, orderField, dispatch])

    useEffect(() => {
        // prevent unnecesaries requests
        if(order !== orderField){
            queryClient.refetchQueries()
        }
    }, [queryClient, order, orderField])

	return (
        <button className={`toggle-btn btn ${ isSelected ? 'btn-primary' : 'btn-outline' }`} onClick={handleToggle}>
            { orderToggle ? <BiArrowToBottom /> : <BiArrowToTop /> }
        </button>
	);
}

export default Ordering