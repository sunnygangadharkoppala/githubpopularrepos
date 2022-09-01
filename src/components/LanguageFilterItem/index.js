import './index.css'

const LanguageFilterItem = props => {
  const {each, filter, appendFilter} = props
  const {id, language} = each
  const filteredButton = filter === id ? 'activateButton' : 'normalButton'
  const buttonClicked = () => {
    appendFilter(id)
  }
  return (
    <li>
      <button className={filteredButton} onClick={buttonClicked} type="button">
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
