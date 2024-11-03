import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {IoIosSearch, IoMdClose, IoMdMenu} from 'react-icons/io'
import {MdHome, MdSchedule} from 'react-icons/md'
import {RxArrowTopRight} from 'react-icons/rx'
import MovieCard from '../MovieCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const API_KEY = '76a3b00b83c8438422c7b7eb425b0645'
const Header = () => {
  const [isSowMenu, setToggle] = useState(false)
  const [searchChars, setSearchChars] = useState('')
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.inProgress,
    data: [],
  })
  useEffect(() => {
    const getSearchList = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchChars}&page=1`,
        )
        const dataResponse = await response.json()
        const updatedData = dataResponse.results.map(each => ({
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
        setApiResponse(prevStatus => ({
          ...prevStatus,
          status: apiStatusConstants.success,
          data: updatedData,
        }))
      } catch (error) {
        setApiResponse(prev => ({...prev, status: apiStatusConstants.failure}))
      }
    }
    getSearchList()
  }, [searchChars])

  const toggleMenuBtn = () => {
    setToggle(prev => !prev)
  }
  const onChangeInput = event => {
    setSearchChars(event.target.value)
  }
  // .....................
  const {data, status} = apiResponse
  const renderSuccessView = () => (
    <div className="search-movies-container movies-container">
      <h1 className="heading">Search Result</h1>
      <ul className="movies-list-container">
        {data.map(each => (
          <MovieCard
            isSearchResult
            key={`details${each.id}`}
            movieDetails={each}
          />
        ))}
      </ul>
    </div>
  )
  const renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )
  const renderDiffrentViews = () => {
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoader()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return <h1 className="failure-mesg">Error</h1>
      default:
        return null
    }
  }
  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="link">
          <h1 className="logo-name">
            Prime <span className="logo-high">Show</span>
          </h1>
        </Link>
        <div className="search-div">
          <input
            className="search-input"
            onChange={onChangeInput}
            type="search"
            placeholder="Search"
          />
          <IoIosSearch className="search-icon" />
        </div>
        <div className="nav-items-lg">
          <Link to="/" className="link">
            <p className="item-lg">Home</p>
          </Link>
          <Link to="/top-rated" className="link">
            <p className="item-lg">Top Rated</p>
          </Link>
          <Link to="/upcoming" className="link">
            <p className="item-lg">Upcoming</p>
          </Link>
        </div>
        <div className="lg-hide">
          {!isSowMenu ? (
            <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
              <IoMdMenu className="icon" />
            </button>
          ) : (
            <button type="button" className="menu-btn" onClick={toggleMenuBtn}>
              <IoMdClose className="icon" />
            </button>
          )}
        </div>
      </nav>
      {isSowMenu ? (
        <div className="menu-div">
          <div className="nav-items-sm">
            <Link to="/" className="route-link">
              <MdHome className="route-icon" />
              <p className="item"> Home</p>
            </Link>
            <Link to="/top-rated" className="route-link">
              <RxArrowTopRight className="route-icon" />
              <p className="item">Top Rated Movies</p>
            </Link>
            <Link to="/upcoming" className="route-link">
              <MdSchedule className="route-icon" />
              <p className="item">Upcoming Movies</p>
            </Link>
          </div>
        </div>
      ) : null}
      {data.length >= 1 ? renderDiffrentViews() : ''}
    </>
  )
}
export default Header
