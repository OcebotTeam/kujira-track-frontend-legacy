const Card = (props) => {
  return (
    <div className="card bg-dark">
      <div className="card-body">
        <h5 className="text-muted fw-light">{props.overTitle}</h5>
        <h3 className="card-title text-white">{props.title} </h3>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
