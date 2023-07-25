import { Box, Pagination, PaginationItem } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { changePage } from '@/entities/posts'

import './pagination.css'

export const ChangePage = () => {
	const total = useAppSelector((state) => state.posts.totalPage) / 10

	const current = useAppSelector((state) => state.posts.page)

	const dispatch = useAppDispatch()
	return (
		<Box className='wrap-pg'>
			<Pagination
				onChange={(_, v) => dispatch(changePage(v))}
				page={current}
				count={total}
				renderItem={(item) => (
					<PaginationItem
						components={{
							next: (props) => (
								<button className='btn-pag' {...props}>
									Далее
								</button>
							),
							previous: (props) => <button {...props}>Назад</button>,
						}}
						{...item}
					/>
				)}
			/>
		</Box>
	)
}
