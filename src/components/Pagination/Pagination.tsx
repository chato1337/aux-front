import { useDispatch, useSelector } from 'react-redux';
import { setOffset } from "../../redux/settingsSlice";
import { RootState } from "../../redux/store";
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import './Pagination.styles.scss'

const Pagination = () => {
    const dispatch = useDispatch()
    const [ t ] = useTranslation()
    const limit = useSelector((state: RootState) => state.settings.limit)
    const offset = useSelector((state: RootState) => state.settings.offset)
    const count = useSelector((state: RootState) => state.settings.count)
    const queryClient = useQueryClient()
    const next = limit + offset <= count
    const canPrev = offset >= limit
    const totalPages = Math.ceil(count / limit)

    const handlePaginate = (action: "prev" | "next") => {
        if (action === "next" &&  limit + offset <= count) {
            dispatch(setOffset(limit + offset))
        }else if(action === "prev" && offset >= limit) {
            dispatch(setOffset(offset - limit))
        }
    }

	const handleJumpPag = (pageJump: number) => {
		const toJump = (pageJump * limit) - limit
		dispatch(setOffset(toJump))
	}

    useEffect(() => {
        queryClient.refetchQueries()
    }, [offset, queryClient])

    return (
        <div className='pagination-container'>
            <button
                onClick={() => handlePaginate("prev")}
                disabled={!canPrev}
            >
                <BiArrowToLeft />
                { t('previous') }
            </button>
			{
				//generate jump pagination buttons
				Array.from({ length: totalPages }).map((el: any, i) => {
					const index = i + 1
					const isActive = offset === (index * limit) - limit

					return (
						<button
							key={index}
							onClick={ () => handleJumpPag(index) }
							className={ isActive ? 'pag-active' : '' }
						>
							{ index }
						</button>
					)
				})
			}
            <button
                onClick={() => handlePaginate("next")}
                disabled={!next}
            >
                { t('next') }
                <BiArrowToRight />
            </button>
        </div>
    );
}

export default Pagination
