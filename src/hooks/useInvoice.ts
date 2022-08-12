import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { StockService } from '../services/StockService';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCount, setModal } from '../redux/settingsSlice';
import { useModal } from './useModal';
import { Invoice } from '../models/Stock.model.d';
import { setInvoice } from '../redux/cartSlice';

export const useInvoice = () => {
    const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
    const limit = useSelector((state: RootState) => state.settings.limit)
    const offset = useSelector((state: RootState) => state.settings.offset)
    const count = useSelector((state: RootState) => state.settings.count)
    const order = useSelector((state: RootState) => state.settings.order)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
	const { modalIsOpen, closeModal } = useModal()

    const { data, isSuccess } = useQuery(
        ["invoice", searchQuery, limit, offset, order],
        StockService.getStock,
        { keepPreviousData: true }
    )

	const handleModal = (invoce: Invoice | null) => {
		dispatch(setModal(true))
		dispatch(setInvoice(invoce))
	}

    //preload next category
    useEffect(() => {
        if (isSuccess) {
            dispatch(setCount(data.count));
            //prevent unnecessary request if the next page not exist
            if (limit + offset <= count && !searchQuery) {
                const nextOffset = offset + limit;
                queryClient.prefetchQuery(
                    ["invoice", null, limit, nextOffset, order],
                    StockService.getStock
                );
            }
        }
    }, [
        data,
        dispatch,
        isSuccess,
        limit,
        offset,
        queryClient,
        count,
        order,
        searchQuery,
    ]);

    return {
        data,
        isSuccess,
		modalIsOpen,
		closeModal,
		handleModal
    }
}
