const ArticlesCard = ({ article }) => {
  // approve function

  const approveArticle = (id) => {
    console.log(id, "approve");
  };
  // decline function

  const declineArticle = (id) => {
    console.log(id, "decline");
  };
  // delete function

  const deleteArticle = (id) => {
    console.log(id, "delete");
  };
  // make premium function

  const makePremiumArticle = (id) => {
    console.log(id, "premium");
  };

  const {
    _id,
    articleTitle,
    articleDescription,
    articleImage,
    publisherName,
    articleTags,
    postedDate,
    status,
    authorName,
    authorEmail,
    authorPhoto,
  } = article;

  return (
    <>
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={articleImage} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{articleTitle}</h2>
          <p>{authorName}</p>
          <p>{authorEmail}</p>
          <img src={authorPhoto} alt="" className="w-8 avatar rounded-full" />
          <p>{postedDate}</p>
          <p>{status}</p>
          <p>{publisherName}</p>
          <div className="card-actions justify-start">
            <button
              onClick={() => approveArticle(_id)}
              className="btn btn-outline btn-xs"
            >
              Approve
            </button>
            <button
              onClick={() => declineArticle(_id)}
              className="btn btn-primary btn-xs"
            >
              Decline
            </button>
            <button
              onClick={() => deleteArticle(_id)}
              className="btn btn-error btn-xs"
            >
              Delete
            </button>
            <button
              onClick={() => makePremiumArticle(_id)}
              className="btn btn-warning btn-xs"
            >
              Make premium
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesCard;
