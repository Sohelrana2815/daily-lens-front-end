import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { BiDetail, BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { BsEye, BsTwitterX } from "react-icons/bs";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosing_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

// Tag options (predefined)
const tagOptions = [
  { value: "news", label: "News" },
  { value: "technology", label: "Technology" },
  { value: "sports", label: "Sports" },
  { value: "politics", label: "Politics" },
  { value: "entertainment", label: "Entertainment" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "finance", label: "Finance" },
];

const MyArticles = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { data: myArticles = [], refetch } = useQuery({
    queryKey: ["myArticles", user?.email],
    queryFn: async () => {
      const response = await axiosPublic.get(
        `/myArticles?authorEmail=${user?.email}`
      );
      return response.data;
    },
  });

  const [publishers, setPublishers] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [declineReason, setDeclineReason] = useState("");
  // React hook form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const articleTag = selectedTags.map((tag) => tag.value); // Get tags from selectedTags state

    if (!selectedArticle) {
      alert("No article selected!");
      return;
    }

    try {
      let updatedImageUrl = selectedArticle.articleImage; // Default to current image

      // Check if a new image is uploaded
      if (data.articleImage && data.articleImage.length > 0) {
        const imageFile = { image: data.articleImage[0] };

        const imageResponse = await axiosPublic.post(
          image_hosing_api,
          imageFile,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );

        if (imageResponse.data.success) {
          updatedImageUrl = imageResponse.data.data.display_url; // Use new image URL
        }
      }

      const myArticle = {
        articleTitle: data.articleTitle,
        articleDescription: data.articleDescription,
        articleImage: updatedImageUrl,
        publisherName: data.publisherName,
        articleTags: articleTag, // Use selectedTags
      };

      // Update the article
      const response = await axiosPublic.patch(
        `/myArticles/${selectedArticle._id}`,
        myArticle
      );

      if (response.data.modifiedCount > 0) {
        refetch();
        alert("Update success!");
        closeModal();
        reset();
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  useEffect(() => {
    axiosPublic
      .get("/publishers")
      .then((response) => {
        setPublishers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosPublic]);

  // Delete specific article
  const deleteArticle = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/myArticles/${id}`);
          if (response.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your article have been deleted.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error deleting article or image:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the article or image. Try again.",
            icon: "error",
          });
        }
      }
    });
  };

  // Open modal

  const openModal = (article) => {
    console.log(article);

    setSelectedArticle(article); // set selected article
    setSelectedTags(
      article.articleTags.map((tag) => ({ value: tag, label: tag })) // Map tags for select component
    );
    const modal = document.getElementById("my_modal_5");
    modal.showModal(); // Open the modal
  };

  // Close modal

  const closeModal = () => {
    const modal = document.getElementById("my_modal_5");
    modal.close(); // Close the modal
    setSelectedArticle(null);
    reset(); // Reset the form
  };

  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-4">
        {/* Table  */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg dark:bg-gray-800 dark:text-gray-200">
          <table className="table-auto w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">#</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Article Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Premium?
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Article Details
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Update
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold">
                  Delete
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {myArticles.map((myArticle, index) => (
                <tr
                  key={myArticle._id}
                  className={`${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm">
                    {myArticle.articleTitle}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {myArticle.status === "decline" ? (
                      <>
                        <span className="text-red-600 dark:text-red-400">
                          Declined
                        </span>
                        <button
                          className="btn btn-sm  btn-warning  ml-2"
                          onClick={() => {
                            setDeclineReason(myArticle.declineReason); // Set decline reason
                            document
                              .getElementById("decline_reason_modal")
                              .showModal(); // Open modal
                          }}
                        >
                          <BsEye />
                        </button>
                      </>
                    ) : (
                      <span
                        className={`px-2 py-1 rounded-md ${
                          myArticle.status === "approved"
                            ? "bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-200"
                            : "bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-200"
                        }`}
                      >
                        {myArticle.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {myArticle.isPremium ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2">
                    {myArticle.status === "approved" ? (
                      <Link to={`/articlesDetails/${myArticle._id}`}>
                        <button className="btn btn-sm btn-success">
                          <BiDetail className="text-white" />
                        </button>
                      </Link>
                    ) : (
                      <div className="text-center">
                        <button
                          disabled
                          className="btn btn-sm btn-disabled dark:bg-red-600"
                        >
                          <BiDetail className="text-white" />
                        </button>
                        <p className="text-xs text-red-600">Not Approved Yet</p>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openModal(myArticle)}
                      className="btn btn-sm bg-blue-600 text-white hover:bg-blue-500 dark:border-none"
                    >
                      <BiEdit />
                    </button>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => deleteArticle(myArticle._id)}
                      className="btn btn-sm bg-red-600 text-white hover:bg-red-500 dark:border-none"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}

        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box dark:bg-[#1F2937] relative">
            <h3 className="font-bold text-lg lg:text-xl text-center font-EbGaramond py-4">
              Update Your Article
            </h3>

            {selectedArticle && (
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Close button */}
                <div className="modal-action absolute top-0 right-4">
                  <button
                    title="CLOSE"
                    className="btn btn-sm btn-outline  hover:bg-red-600 hover:border-none dark:border-warning"
                    onClick={closeModal}
                  >
                    <BsTwitterX className="hover:text-white  dark:text-white" />
                  </button>
                </div>

                {/* Article title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Article Title</span>
                  </label>
                  <input
                    type="text"
                    {...register("articleTitle")}
                    defaultValue={selectedArticle.articleTitle}
                    className="input input-bordered bg-[#31795A17] dark:bg-[#374151]"
                  />
                </div>
                {/* Article Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Article Description</span>
                  </label>
                  <textarea
                    type="text"
                    {...register("articleDescription")}
                    defaultValue={selectedArticle.articleDescription}
                    className="textarea textarea-bordered bg-[#31795A17] dark:bg-[#374151] w-full resize-none focus:ring-2 focus:ring-blue-500"
                    rows={4} // Set a default row count
                  />
                </div>

                {/* Current Image Preview */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Current Image</span>
                  </label>
                  <img
                    src={selectedArticle?.articleImage}
                    alt="Current Article"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>

                {/* File Input */}
                <div className="form-control mt-4">
                  <label className="label">
                    <span className="label-text">Upload New Image</span>
                  </label>
                  <input
                    type="file"
                    {...register("articleImage")} // No 'required' validation here
                    className="file-input file-input-bordered w-full max-w-xs dark:bg-[#374151]"
                  />
                </div>

                {/* Publisher Name Dropdown*/}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Publisher Name</span>
                  </label>
                  <select
                    defaultValue={selectedArticle.publisherName}
                    className="select select-bordered dark:bg-[#374151]"
                    {...register("publisherName", { required: true })}
                  >
                    <option value="" disabled>
                      Select Publisher Name
                    </option>
                    {publishers.map((publisher) => (
                      <option key={publisher._id} value={publisher.name}>
                        {publisher.publisherName}
                      </option>
                    ))}
                  </select>
                  {errors.publisher && (
                    <span className="text-error">
                      Publisher field is required
                    </span>
                  )}
                </div>
                {/* Tags Multi-Select */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Tags</span>
                  </label>
                  <Select
                    isMulti
                    options={tagOptions}
                    value={selectedTags}
                    onChange={(selectedOptions) =>
                      setSelectedTags(selectedOptions)
                    }
                    className="basic-multi-select"
                    // Styles

                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor:
                          document.documentElement.classList.contains("dark")
                            ? "#181C14" // Use black background in dark mode
                            : base.backgroundColor,
                        color: document.documentElement.classList.contains(
                          "dark"
                        )
                          ? "white" // Text color white for visibility in dark mode
                          : base.color,
                        borderColor:
                          document.documentElement.classList.contains("dark")
                            ? "gray" // Gray border in dark mode for a subtle look
                            : base.borderColor,
                      }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor:
                          document.documentElement.classList.contains("dark")
                            ? "black"
                            : base.backgroundColor,
                      }),
                      multiValue: (base) => ({
                        ...base,
                        backgroundColor:
                          document.documentElement.classList.contains("dark")
                            ? "gray"
                            : base.backgroundColor,
                        color: document.documentElement.classList.contains(
                          "dark"
                        )
                          ? "white"
                          : base.color,
                      }),

                      multiValueLabel: (base) => ({
                        ...base,
                        color: document.documentElement.classList.contains(
                          "dark"
                        )
                          ? "white"
                          : base.color,
                      }),
                      option: (base, { isFocused }) => ({
                        ...base,
                        backgroundColor: isFocused
                          ? document.documentElement.classList.contains("dark")
                            ? "gray" // Dark mode focused option background
                            : "lightblue" // Light mode focused option background
                          : base.backgroundColor,
                        color: document.documentElement.classList.contains(
                          "dark"
                        )
                          ? "white"
                          : base.color,
                      }),
                    }}
                  />
                </div>
                <button
                  title="Update"
                  type="submit"
                  className="btn w-full mt-5 bg-[#201658] rounded-md text-white uppercase font-medium text-base shadow-lg hover:bg-[#1c1450] dark:bg-[#2563EB] dark:hover:bg-[#1d4ed8] border-none font-volKHob focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  Update Article
                </button>
              </form>
            )}
          </div>
        </dialog>

        {/* Decline Reason Modal */}
        <dialog
          id="decline_reason_modal"
          className="modal modal-bottom sm:modal-middle dark:text-gray-300"
        >
          <div className="modal-box bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200">
                Decline Reason
              </h3>
              <button
                className=" hover:text-white hover:bg-red-600 p-2"
                title="Close"
                onClick={() => {
                  document.getElementById("decline_reason_modal").close(); // Close modal
                }}
                aria-label="Close"
              >
                <BsTwitterX className="text-lg" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-400">
                {declineReason || "No reason provided."}
              </p>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default MyArticles;
