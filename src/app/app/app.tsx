import { Box } from '@mui/material'

import { Pagination } from '@/features/change-page'
import { useGetPosts } from '@/features/get-posts'
import { Search } from '@/features/search'
import { TablePosts } from '@/widgets'

import './app.css'

function App() {
	useGetPosts()

	return (
		<Box className='app'>
			<Search />
			<TablePosts />
			<Pagination />
		</Box>
	)
}

export default App
