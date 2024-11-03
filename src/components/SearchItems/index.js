import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import Header from '../Header'
import MovieCard from '../MovieCard'
const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
class SearchItem extends Component {
  state = {
    status: diffStates.inProgress,
    movieData: [],
  }
  componentDidMount = async () => {
    const API_KEY = '76a3b00b83c8438422c7b7eb425b0645'
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
      )
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        adult: each.adult,
        backdropPath: each.backdrop_path,
        genreIds: each.genre_ids,
        id: each.id,
        originalLanguage: each.original_language,
        originalTitle: each.original_title,
        overview: each.overview,
        popularity: each.popularity,
        posterPath: each.poster_path,
        releaseDate: each.release_date,
        title: each.title,
        video: each.video,
        voteAverage: each.vote_average,
        voteCount: each.vote_count,
      }))
      this.setState({status: diffStates.success, movieData: updatedData})
    } catch (error) {
      this.setState({status: diffStates.fail})
    }
  }
  renderSuccessView = () => {
    const {movieData} = this.state
    // console.log(movieData)
    return (
      <div className="movies-container">
        <h1 className="heading">Popular Movies</h1>
        <ul className="movies-list-container">
          {movieData.map(each => (
            <MovieCard key={`details${each.id}`} movieDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  renderDiffrentViews = () => {
    const {status} = this.state
    switch (status) {
      case diffStates.inProgress:
        return this.renderLoader()
      case diffStates.success:
        return this.renderSuccessView()
      case diffStates.fail:
        return <h1 className="failure-mesg">Error</h1>
      default:
        return null
    }
  }
  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderDiffrentViews()}
      </div>
    )
  }
}
export default SearchItem