import "./service-card.scss";

function ServiceCard({ data }) {
  return (
    <div className="service-card">
      {data.badge && <div className="service-card__badge">{data.badge}</div>}
      <div className="service-card__icon">
        <img src={data.icon} alt={data.title} />
      </div>

      <h3 className="service-card__title">{data.title}</h3>
      <p className="service-card__text">{data.text}</p>
      <p className="service-card__price">{data.price}</p>
      <button className="service-card__btn">Замовити</button>
    </div>
  );
}

export default ServiceCard;
