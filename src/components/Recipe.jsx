import PropTypes from 'prop-types'
import { User } from './User.jsx'

export function Recipe({ title, ingredientList, image, author: userId }) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        <b>Ingredients needed:</b>
        {ingredientList}
      </div>
      <br />
      <img src={image} alt='' width='250' height='250' />
      {userId && (
        <em>
          <br />
          <small>
            Recipe submitted by <User id={userId} />{' '}
          </small>
        </em>
      )}
    </article>
  )
}
Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredientList: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  author: PropTypes.string,
}
