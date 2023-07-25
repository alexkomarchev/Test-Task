import { Box, InputAdornment, TextField } from '@mui/material'

import { useAppDispatch } from '@/app/store.ts'
import { goSearch } from '@/entities/posts'

import './search.css'

export const Search = () => {
	const dispatch = useAppDispatch()

	return (
		<Box className='wrap'>
			<TextField
				className='search'
				onChange={(e) => dispatch(goSearch(e.target.value))}
				fullWidth
				placeholder='Поиск'
				InputProps={{
					endAdornment: (
						<InputAdornment position='start'>
							<img src={'/icons/search.svg'} />
						</InputAdornment>
					),
				}}
			/>
		</Box>
	)
}
