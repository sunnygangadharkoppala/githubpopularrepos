import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    filter: languageFiltersData[0].id,
    isLoaded: false,
    loading: true,
  }

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const {filter} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${filter}`
    const options = {
      header: {},
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const fetchData = await response.json()
      const newData = fetchData.popular_repos.map(each => ({
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        id: each.id,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({repositoryList: newData, isLoaded: true, loading: true})
    } else {
      this.setState({loading: false})
    }
  }

  appendFilter = filter => {
    this.setState({filter, isLoaded: false}, this.getItems)
  }

  createRepositoryList = () => {
    const {repositoryList, isLoaded, loading} = this.state
    if (loading === false) {
      return (
        <div className="failureContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
            alt="failure view"
          />
        </div>
      )
    }
    return isLoaded ? (
      <div className="repositoryContainer">
        {repositoryList.map(each => (
          <RepositoryItem details={each} key={each.id} />
        ))}
      </div>
    ) : (
      <div className="loaderContainer" testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  createLanguageFilters = () => {
    const {filter} = this.state
    return (
      <ul className="filterButtonsContainer">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            each={each}
            key={each.id}
            filter={filter}
            appendFilter={this.appendFilter}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="appContainer">
        <h1 className="mainHeading">Popular</h1>
        {this.createLanguageFilters()}
        {this.createRepositoryList()}
      </div>
    )
  }
}

export default GithubPopularRepos
