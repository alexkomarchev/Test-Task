import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store.ts'
import { fetchPosts } from '@/entities/posts'

export const useGetPosts = () => {
	const page = useAppSelector((state) => state.posts.page)

	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchPosts(page))
		const url = `${window.location.pathname}?&_page=${page}`
		window.history.pushState(null, document.title, url)
	}, [page])
}
