import { useId } from 'react'
import { Box, Typography } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { goFilter } from '@/entities/posts/model/postsSlice.ts'
import { Arrow } from '@/shared/arrow'
import Row from '@/widgets/posts-table/ui/row.tsx'

export const TablePosts = () => {
	const posts = useAppSelector((state) => state.posts.searchPosts)
	const filters = useAppSelector((state) => state.posts.filters)
	const id = useId()
	const dispatch = useAppDispatch()
	return (
		<Table aria-label='simple table'>
			<TableHead
				sx={{
					backgroundColor: '#474955',
					color: 'white',
					boxShadow: '0px 4px 27px 0px rgba(230, 231, 234, 0.78)',
				}}
			>
				<TableRow sx={{ th: { color: 'white', cursor: 'pointer' } }}>
					<TableCell sx={{ display: 'flex' }} align='center'>
						<Box onClick={() => dispatch(goFilter('isSortDescendingOrder'))} sx={{ display: 'flex', justifyContent: 'center' }}>
							ID
							<Arrow isUp={filters.isSortDescendingOrder} />
						</Box>
					</TableCell>
					<TableCell align='center'>
						<Box onClick={() => dispatch(goFilter('isSortTitleByABC'))} sx={{ display: 'flex', justifyContent: 'center' }}>
							Заголовок
							<Arrow isUp={filters.isSortTitleByABC} />
						</Box>
					</TableCell>
					<TableCell align='center'>
						<Box onClick={() => dispatch(goFilter('isSortBodyByABC'))} sx={{ display: 'flex', justifyContent: 'center' }}>
							Описание
							<Arrow isUp={filters.isSortBodyByABC} />
						</Box>
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{posts === null ? (
					<Typography>Постов нет</Typography>
				) : (
					posts.map((el) => <Row key={id} id={el.id} title={el.title} body={el.body} />)
				)}
			</TableBody>
		</Table>
	)
}
