
const Navigator = (props) => {
  const page = props.page;
  const updatePage = props.updatePage;

  const onBackButtonClick = () => {
    let newPage = page - 1;
    if (newPage >= 1) {
      updatePage(page - 1);
    }
  }

  const onNextButtonClick = () => {
    updatePage(page + 1);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <button className="btn btn-primary" onClick={onBackButtonClick}>Back</button>
      <span>[ {page} ]</span>
      <button className="btn btn-primary" onClick={onNextButtonClick}>Next</button>
    </div>
  )
}

export default Navigator;