import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const ArticlesCard = ({ article }) => {
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

  const axiosPublic = useAxiosPublic();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  // Handle Decline Submission

  const onSubmit = async (data) => {
    if (!selectedArticle) {
      alert("No article selected!");
      return;
    }

    const declineArticle = {
      status: "decline",
      declineReason: data.declineReason,
    };

    try {
      const response = await axiosPublic.patch(
        `/declineArticles/${selectedArticle._id}`,
        declineArticle
      );

      console.log("Article decline: ", response.data);

      // Reset state and close modal

      closeModal();
      reset();
    } catch (error) {
      // catch error
      console.log("Error updating article:", error);
    }
  };

  // Approve article function

  const approveArticle = async (id) => {
    try {
      const response = await axiosPublic.patch(`/approveArticles/${id}`, {
        status: "approved",
      });
      console.log("Article approved:", response.data);
    } catch (error) {
      console.error("Error approving article:", error);
    }
  };

  // Make premium Function

  const makePremiumArticle = async (id) => {
    try {
      const response = await axiosPublic.patch(`/makePremium/${id}`, {
        idPremium: true,
      });
      console.log("Article made premium:", response.data);
    } catch (error) {
      console.error("Error making article premium:", error);
    }
  };

  // Delete Article Function

  const deleteArticle = async (id) => {
    try {
      const response = await axiosPublic.delete(`/articles/${id}`);
      console.log("Article deleted:", response.data);
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Open modal

  const openModal = (article) => {
    setSelectedArticle(article);
    const modal = document.getElementById(`modal_${article._id}`);
    modal.showModal();
  };

  // Close modal

  const closeModal = () => {
    if (selectedArticle) {
      const modal = document.getElementById(`modal_${selectedArticle._id}`);
      modal.close();
    }

    setSelectedArticle(null);
  };

  return (
    <>
      {/* Card */}
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img src={articleImage} alt="Article" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{articleTitle}</h2>
          <p>{authorName}</p>
          <p>{authorEmail}</p>
          <img
            src={authorPhoto}
            alt="Author"
            className="w-8 avatar rounded-full"
          />
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
              onClick={() => openModal(article)}
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

      {/* Modal */}

      <dialog
        id={`modal_${_id}`}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg lg:text-xl text-center py-4">
            Reason for Decline This Article
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <textarea
                placeholder="Why?"
                className="textarea textarea-bordered"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                className="btn mt-5 bg-red-600 rounded-full text-white uppercase w-full"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default ArticlesCard;
