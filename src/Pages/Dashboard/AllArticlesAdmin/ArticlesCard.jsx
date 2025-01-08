import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ArticlesCard = ({ article, refetch }) => {
  const {
    _id,
    articleTitle,
    articleImage,
    publisherName,
    postedDate,
    status,
    authorName,
    authorEmail,
    authorPhoto,
    isPremium,
  } = article;

  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [selectedArticle, setSelectedArticle] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
      const response = await axiosSecure.patch(
        `/declineArticles/${selectedArticle._id}`,
        declineArticle
      );
      if (response.data.modifiedCount > 0) {
        refetch();
        Swal.fire(
          "Declined!",
          "Article has been declined successfully.",
          "success"
        );
        closeModal();
        reset();
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  // Confirmation handler with SweetAlert2
  const handleAction = async (action, id, apiCall) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to ${action} this article?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${action}!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await apiCall(id);
          if (
            response.data.modifiedCount > 0 ||
            response.data.deletedCount > 0
          ) {
            Swal.fire(
              `${action}d!`,
              `The article has been ${action}d.`,
              "success"
            );
            refetch();
          }
        } catch (error) {
          console.error(`Error while ${action}ing article:`, error);
        }
      }
    });
  };

  const approveArticle = (id) => axiosSecure.patch(`/approveArticles/${id}`);
  const makePremiumArticle = (id) => axiosSecure.patch(`/makePremium/${id}`);
  const deleteArticle = (id) => axiosSecure.delete(`/articles/${id}`);

  // Modal handlers
  const openModal = (article) => {
    setSelectedArticle(article);
    const modal = document.getElementById(`modal_${article._id}`);
    modal.showModal();
  };

  const closeModal = () => {
    if (selectedArticle) {
      const modal = document.getElementById(`modal_${selectedArticle._id}`);
      modal.close();
    }
    setSelectedArticle(null);
    reset();
  };

  return (
    <>
      {/* Card */}
      <div className="flex flex-wrap justify-center">
        <div className="card w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mx-auto">
          {/* Article Image */}
          <figure className="relative h-48 w-full">
            <img
              src={articleImage}
              alt="Article"
              className="w-full h-full object-cover"
            />
            {/* Conditional Badge */}
            <div className="absolute top-2 left-2">
              {isPremium && (
                <span className="badge badge-warning text-slate-700 text-sm font-bold px-3 py-1 rounded-lg">
                  Premium
                </span>
              )}
              {!isPremium && status === "approved" && (
                <span className="badge badge-success text-white text-sm font-bold px-3 py-1 rounded-lg">
                  Approved
                </span>
              )}
              {status === "decline" && (
                <span className="badge badge-error text-white text-sm font-bold px-3 py-1 rounded-lg">
                  Declined
                </span>
              )}
              {status === "pending" && (
                <span className="badge badge-info text-gray-900  text-sm font-semibold px-3 py-1 rounded-lg">
                  Pending...
                </span>
              )}
            </div>
          </figure>

          {/* Article Details */}
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white truncate">
              {articleTitle}
            </h2>

            <div className="flex items-center mt-2 gap-2">
              <img
                src={authorPhoto}
                alt="Author"
                className="w-8 h-8 rounded-full object-cover border-2 border-gray-300"
              />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {authorName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  {authorEmail}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Posted on: {postedDate}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Status: <span className="font-medium">{status}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Publisher: <span className="font-medium">{publisherName}</span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {status === "pending" && (
                <button
                  onClick={() => handleAction("approve", _id, approveArticle)}
                  className="btn btn-xs btn-outline dark:text-white text-primary border-primary hover:bg-primary hover:text-white"
                >
                  Approve
                </button>
              )}
              {status === "pending" && (
                <button
                  onClick={() => openModal(article)}
                  className="btn btn-xs text-white bg-blue-500 hover:bg-blue-600 dark:border-none"
                >
                  Decline
                </button>
              )}
              {!isPremium && (
                <button
                  onClick={() => handleAction("delete", _id, deleteArticle)}
                  className="btn btn-xs dark:border-none text-white bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              {!isPremium && status !== "decline" && (
                <button
                  title="Article not approved yet"
                  disabled={status !== "approved"}
                  onClick={() =>
                    handleAction("make premium", _id, makePremiumArticle)
                  }
                  className={`btn btn-xs font-semibold text-black px-4 rounded-lg ${
                    status !== "approved"
                      ? "bg-stone-300 dark:bg-stone-400 dark:text-black"
                      : "bg-yellow-500 hover:bg-yellow-600 border-none"
                  }`}
                >
                  Make Premium
                </button>
              )}
            </div>
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
                {...register("declineReason", { required: true })}
                placeholder="Why?"
                className="textarea textarea-bordered"
              ></textarea>
              {errors.declineReason && (
                <span className="text-error">This field is required</span>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="btn mt-5 bg-primary w-full rounded-lg text-white uppercase"
              >
                Submit
              </button>
            </div>
          </form>
          <div className="modal-action">
            <button className="btn btn-outline btn-error" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default ArticlesCard;
