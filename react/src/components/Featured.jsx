import Promo from "./Promo"

const Featured = (props) => {
  return (
    <>
      <h5>Featured</h5>
      <div className="card-container" style={{ display: 'flex', flexWrap: "nowrap", gap: '20px', padding: '20px' }}>
        {
          props.promoData.map(
            (promo) => (
              <Promo key={promo.id} data={promo} />
            ))
        }
      </div>
    </>
  )
}

export default Featured;