import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { getPosts } from '../api/getPosts.ts'

export type Post = {
	userId: number
	id: number
	title: string
	body: string
}

type Filters = 'isSortDescendingOrder' | 'isSortTitleByABC' | 'isSortBodyByABC'

export interface PostsSlice {
	page: number
	posts: Post[] | null
	searchPosts: Post[] | null
	totalPage: number
	filters: Record<Filters, boolean>
}

const curPage = new URLSearchParams(window.location.search).get('_page')

const initialState: PostsSlice = {
	page: curPage ? +curPage : 1,
	posts: null,
	searchPosts: null,
	totalPage: 0,
	filters: {
		isSortDescendingOrder: false,
		isSortTitleByABC: false,
		isSortBodyByABC: false,
	},
}

const filterByType = (type: Filters, posts: Post[]) => {
	if (type === 'isSortDescendingOrder') {
		return posts.sort((a: Post, b: Post) => b.id - a.id)
	}

	if (type === 'isSortTitleByABC') {
		return posts.sort((a, b) => a.title.localeCompare(b.title))
	}

	if (type === 'isSortBodyByABC') {
		return posts.sort((a, b) => a.body.localeCompare(b.body))
	}

	return posts
}

const filterIfFiltersActive = (filters: Record<Filters, boolean>, posts: Post[]): Post[] | null => {
	const keys = Object.entries(filters) as unknown as Array<[Filters, boolean]>

	keys.forEach(([key, value]) => {
		if (value) {
			return filterByType(key, posts)
		}
	})

	return null
}

export const fetchPosts = createAsyncThunk('posts', async (page: number) => await getPosts(page))

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		changePage: (state, action: PayloadAction<number>) => {
			state.page = action.payload
		},
		goSearch: (state, action: PayloadAction<string>) => {
			if (!state.posts) {
				return
			}

			const request = action.payload

			const searchFn = (el: Post) => el.title.includes(request) || el.body.includes(request) || el.id.toString().includes(request)

			const searchingPosts = state.posts.filter(searchFn)

			const filtersPosts = filterIfFiltersActive(state.filters, searchingPosts)

			if (filtersPosts === null) {
				state.searchPosts = searchingPosts
				return
			}

			state.searchPosts = filtersPosts
		},
		goFilter: (state, action: PayloadAction<Filters>) => {
			if (!state.searchPosts) {
				return
			}
			const copyPosts = [...state.searchPosts]

			const keys = Object.keys(state.filters) as Array<Filters>

			// Все остальные фильтры делаем выключенными
			keys.forEach((el) => {
				if (el === action.payload) {
					return
				}

				state.filters[el] = false
			})

			if (action.payload === 'isSortDescendingOrder') {
				state.filters.isSortDescendingOrder = !state.filters.isSortDescendingOrder
				const sortFn = (a: Post, b: Post) => (state.filters.isSortDescendingOrder ? b.id - a.id : a.id - b.id)
				copyPosts.sort(sortFn)
			}

			if (action.payload === 'isSortTitleByABC') {
				state.filters.isSortTitleByABC = !state.filters.isSortTitleByABC
				if (!state.filters.isSortTitleByABC) {
					state.searchPosts = state.posts
					return
				}
				copyPosts.sort((a, b) => a.title.localeCompare(b.title))
			}

			if (action.payload === 'isSortBodyByABC') {
				state.filters.isSortBodyByABC = !state.filters.isSortBodyByABC
				if (!state.filters.isSortBodyByABC) {
					state.searchPosts = state.posts
					return
				}
				copyPosts.sort((a, b) => a.body.localeCompare(b.body))
			}

			state.searchPosts = copyPosts
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.posts = action.payload[0]
			state.searchPosts = action.payload[0]
			state.totalPage = action.payload[1]

			const filtersPosts = filterIfFiltersActive(state.filters, action.payload[0])

			if (filtersPosts === null) {
				return
			}

			state.searchPosts = filtersPosts
		})
	},
})

export const { changePage, goSearch, goFilter } = postsSlice.actions
