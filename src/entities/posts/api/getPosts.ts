import { Post } from '@/entities/posts'

const URL = 'https://jsonplaceholder.typicode.com'

export const getPosts = async (page: number): Promise<[Post[], number]> => {
	const response = await fetch(URL + '/posts' + `?&_limit=10&_page=${page}`)

	if (!response.ok) {
		throw Error
	}

	const pageCount = +response.headers.get('x-total-count')!

	const posts = (await response.json()) as Post[]

	return [posts, pageCount]
}
