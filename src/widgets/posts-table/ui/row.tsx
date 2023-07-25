import { FC } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { Post } from '@/entities/posts'

const Row: FC<Omit<Post, 'userId'>> = ({ id, title, body }) => {
	return (
		<TableRow sx={{ '& td': { border: '1px solid #e9e9e9' } }}>
			<TableCell align='center'>{id}</TableCell>
			<TableCell align='left'>{title}</TableCell>
			<TableCell align='left'>{body}</TableCell>
		</TableRow>
	)
}

export default Row
