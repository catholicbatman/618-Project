import PropTypes from 'prop-types'
import { User } from './User.jsx'
import { Link } from 'react-router-dom'

export function Recipe({
  title,
  ingredientList,
  image,
  author,
  _id,
  fullRecipe = false,
}) {
  return (
    <article>
      {fullRecipe ? (
        <h3>{title}</h3>
      ) : (
        <Link to={`/recipes/${_id}`}>
          <h3>{title}</h3>
        </Link>
      )}
      {fullRecipe && [...ingredientList[0]]}
      <br />
      {fullRecipe /*&& {ingredientList}*/ && (
        <img src={image} alt='' width='250' height='250' />
      )}
      {author && (
        <em>
          {fullRecipe && <br />}
          Provided by <User id={author} />
        </em>
      )}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredientList: PropTypes.array.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string,
  _id: PropTypes.string.isRequired,
  fullRecipe: PropTypes.bool,
}
