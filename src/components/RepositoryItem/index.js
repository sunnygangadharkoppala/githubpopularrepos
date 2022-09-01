import './index.css'

const RepositoryItem = props => {
  const {details} = props
  const {avatarUrl, forksCount, issuesCount, name, starsCount} = details
  return (
    <div className="repositoryCard">
      <img className="repositoryImage" src={avatarUrl} alt={name} />
      <p className="repositoryName">{name}</p>
      <p className="description">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="starIcon"
        />
        {starsCount} stars
      </p>
      <p className="description">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt=""
          className="forkIcon"
        />
        {forksCount} forks
      </p>
      <p className="description">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="issueIcon"
        />
        {issuesCount} issues
      </p>
    </div>
  )
}
export default RepositoryItem
