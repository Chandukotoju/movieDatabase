import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const diffStates = {
  inProgress: 'LOADING',
  success: 'SUCCESS',
  fail: 'FAILURE',
}
class CastCard extends Component {
  state = {
    status: diffStates.inProgress,
    castData: [],
  }

  componentDidMount = async () => {
    const {id} = this.props
    const MOVIE_ID = id
    const API_KEY = '76a3b00b83c8438422c7b7eb425b0645'
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${MOVIE_ID}/credits?api_key=${API_KEY}&language=en-US`,
      )
      const responseCast = await response.json()
      const updatedData = responseCast.cast.map(each => ({
        character: each.character,
        knownForDepartment: each.known_for_department,
        originalName: each.original_name,
        profilePath: each.profile_path,
      }))
      this.setState({status: diffStates.success, castData: updatedData})
    } catch (error) {
      this.setState({status: diffStates.fail})
    }
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {castData} = this.state
    return (
      <ul className="cast-list-container">
        {castData.map(each => (
          <li key={`cast${uuidv4()}`} className="cast-item">
            <img
              className="cast-img"
              src={`https://image.tmdb.org/t/p/w500/${each.profilePath}`}
              alt="cast-img"
            />
            <div className="cast-wrapper">
              <p className="charcter-name">{each.character}</p>
              <p className="original-name character-name">
                {each.originalName}
              </p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

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
    return <div className="cast-container">{this.renderDiffrentViews()}</div>
  }
}
export default CastCard
