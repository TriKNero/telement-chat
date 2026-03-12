import { PostList } from './PostList'
import { usePosts } from '../hooks/usePosts'

export function Sidebar() {
  const { data: posts, isLoading, error, refetch } = usePosts()

  return (
    <PostList
      posts={posts}
      isLoading={isLoading}
      error={error as Error | null}
      onRetry={() => refetch()}
      variant="sidebar"
    />
  )
}
