import "./skill-card.scss";

function SkillCard ({data}) {
  return (
    <>
      <img className="img" src={data.icon}
      alt={data.label} aria-hidden />
      <span className="label">{data.label}</span>
    </>
  );
}

export default SkillCard;