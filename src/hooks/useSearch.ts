import { ChangeEvent, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLimit, setSearchQuery, initialLimit } from '../redux/settingsSlice';
import { RootState } from '../redux/store';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

export const useSearch = (numResults: number | null = null) => {
    const searchQuery = useSelector((state: RootState) => state.settings.searchQuery)
    const limit = useSelector((state: RootState) => state.settings.limit)
    const count = useSelector((state: RootState) => state.settings.count)
    const [ value, setValue ] = useState(searchQuery ? searchQuery : "")
    const [ countValue, setCountValue ] = useState(numResults ? numResults : initialLimit)
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    const handleSearch = () => {
        dispatch(setSearchQuery(value))
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const numEvent = parseInt(e.target.value)
		setCountValue(numEvent)
	}

	// set initial state for number of results
    useEffect(() => {
		// check if page has results
        if (count < limit && count > 0) {
            setCountValue(count)
        }
    }, [count, limit])

	// set quantity of results on change select
    useEffect(() => {
        dispatch(setLimit(countValue))
    }, [countValue, dispatch])

    useEffect(() => {
        queryClient.refetchQueries()
    }, [searchQuery, queryClient])

    return {
        handleSearch,
        handleInput,
        handleSelect,
        value,
        countValue
    }
}
