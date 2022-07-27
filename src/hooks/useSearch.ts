
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/settingsSlice';
import { RootState } from '../redux/store';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

export const useSearch = () => {
    const [ value, setValue ] = useState("")
    const dispatch = useDispatch()
    const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
    const queryClient = useQueryClient()

    const handleSearch = () => {
        dispatch(setSearchQuery(value))
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        queryClient.refetchQueries()
    }, [searchQuery, queryClient])

    return {
        handleSearch,
        handleInput,
        value
    }
}