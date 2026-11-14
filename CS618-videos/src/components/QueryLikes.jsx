import { useQuery } from '@tanstack/react-query'
import { getTotalLikes } from '../api/likes'
import PropTypes from 'prop-types'

export function QueryLikes( recipeId ) {
  const totalLikes = useQuery({
    queryKey: ['totalLikes', recipeId],
    queryFn: () => getTotalLikes(recipeId),
  })
  return (
    <div>
      {totalLikes.data?.likes} total likes
    </div>
  )
}

QueryLikes.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
