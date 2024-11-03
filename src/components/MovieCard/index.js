import {Link} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movieDetails} = props
  const {id, title, posterPath, voteAverage} = movieDetails
  const imgUrl = `https://image.tmdb.org/t/p/w500/${posterPath}`
  return (
    <Link to={`/movie/${id}`} className="movie-link">
      <li className="movie-card">
        <img className="img" src={imgUrl} alt={id} />
        <div className="wrapper-div">
          <h1 className="movie-name">{title}</h1>
          <p className="rating">{`${voteAverage.toFixed(1)}/10`}</p>
        </div>
        <Link to={`/movie/${id}`} className="movie-link">
          <button type="button" className="view-more">
            View Details
          </button>
        </Link>
      </li>
    </Link>
  )
}
export default MovieCard
