const Card = ({ title, overTitle, imageTitle, ...props }) => {

    const cardTitle = title;
    let cardTitleImage = "";

    if (imageTitle) {
      cardTitleImage = <img height="33px" className="align-bottom rounded-circle ms-2 border" src={imageTitle} alt="title"/>;
    }

  return (
    <div className="card bg-dark">
      <div className="card-body">
        <h5 className="text-muted fw-light">{overTitle}</h5>
        <h3 className="card-title text-white">{cardTitle}{cardTitleImage}</h3>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
