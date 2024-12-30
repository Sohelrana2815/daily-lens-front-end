import { Link } from "react-router-dom";

const ArticlesCard = ({ approvedArticle }) => {
  const {
    _id,
    publisherName,
    articleTitle,
    articleDescription,
    articleImage,
    articleTags,
    postedDate,
    status,
    authorName,
    authorEmail,
    authorPhoto,
    isPremium,
  } = approvedArticle;
  return (
    <>
      <div
        className={`card card-compact bg-base-100 w-96 shadow-xl ${
          isPremium
            ? "border-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-yellow-100"
            : "border"
        }`}
      >
        <figure>
          <img src={articleImage} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {isPremium && (
              <span className="badge badge-warning ml-2">Premium</span>
            )}
          </h2>
          <h2 className="card-title">{articleTitle}</h2>
          <p>{publisherName}</p>
          <p>
            {articleDescription.slice(0, 80)}{" "}
            <span className="text-blue-600">read more...</span>
          </p>
          <div className="card-actions justify-end">
            <Link to={`/articlesDetails/${_id}`}>
              <button className="btn btn-primary">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticlesCard;
