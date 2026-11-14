import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import {
  getTotalViews,
  getDailyViews,
  getDailyDurations,
} from '../api/events.js'
//import { getTotalLikes } from '../api/likes.js'

import {
  VictoryChart,
  VictoryTooltip,
  VictoryBar,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory'

export function RecipeStats({ recipeId }) {
  const totalViews = useQuery({
    queryKey: ['totalViews', recipeId],
    queryFn: () => getTotalViews(recipeId),
  })
  const dailyViews = useQuery({
    queryKey: ['dailyViews', recipeId],
    queryFn: () => getDailyViews(recipeId),
  })
  const dailyDurations = useQuery({
    queryKey: ['dailyDurations', recipeId],
    queryFn: () => getDailyDurations(recipeId),
  })
  /*const totalLikes = useQuery({
    queryKey: ['totalLikes', recipeId],
    queryFn: () => getTotalLikes(recipeId),
  })*/
  if (
    totalViews.isLoading ||
    dailyViews.isLoading ||
    dailyDurations.isLoading
    //totalLikes.isLoading
  ) {
    return <div>loading stats...</div>
  }
  return (
    <div>
      <br />
      <b>{totalViews.data?.views} total views</b>
      <VictoryChart domainPadding={16}>
        <VictoryBar
          labelComponent={<VictoryTooltip />}
          data={dailyViews.data?.map((d) => ({
            x: new Date(d._id),
            y: d.views,
            label: `${new Date(d._id).toLocaleDateString()}:${d.views} views`,
          }))}
        />
      </VictoryChart>

      <div style={{ width: 512 }}>
        <h4>Daily Average Viewing Duration</h4>
        <VictoryChart
          domainPadding={16}
          containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension='x'
              labels={({ datum }) =>
                `${datum.x.toLocaleDateString()}: ${datum.y.toFixed(2)} minutes`
              }
              labelComponent={<VictoryTooltip />}
            />
          }
        >
          {' '}
          <VictoryLine
            data={dailyDurations.data?.map((d) => ({
              x: new Date(d._id),
              y: d.averageDuration / (60 * 1000),
            }))}
          />{' '}
        </VictoryChart>
      </div>
    </div>
  )
}
RecipeStats.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
