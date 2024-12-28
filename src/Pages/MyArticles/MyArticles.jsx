import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { BiDetail, BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

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

  // React hook form

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!selectedArticle) {
      alert("No article selected!");
      return;
    }

    try {
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

      console.log(imageResponse.data);

      if (imageResponse.data.success) {
        const articleTag = selectedTags.map((tag) => tag.value);

        const myArticle = {
          articleTitle: data.articleTitle,
          articleDescription: data.articleDescription,
          articleImage: imageResponse.data.data.display_url,
          publisherName: data.publisherName,
          articleTags: articleTag,
        };

        // update my posted articles

        const response = await axiosPublic.patch(
          `/myArticles/${selectedArticle._id}`,
          myArticle
        );

        console.log("Article update:", response.data);
        if (response.data.modifiedCount > 0) {
          refetch();
          alert("Update success!");
          closeModal();
          reset();
        }
      }
    } catch (error) {
      console.log("Error updating article:", error);
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
        const response = await axiosPublic.delete(`/myArticles/${id}`);
        if (response.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your Article has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  // Open modal

  const openModal = (article) => {
    console.log(article);

    setSelectedArticle(article); // set selected article
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
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial No.</th>
                <th>Article Title</th>
                <th>Status</th>
                <th>Is Premium</th>
                <th>Article Details</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}

              {myArticles.map((myArticle, index) => (
                <tr key={myArticle._id} className="hover">
                  <th>{index + 1}</th>
                  <td>{myArticle.articleTitle}</td>
                  <td>{myArticle.status}</td>
                  <td>{myArticle.isPremium ? "Yes" : "NO"}</td>
                  <td>
                    {myArticle.status === "approved" ? (
                      <Link to={`/articlesDetails/${myArticle._id}`}>
                        <button className="btn btn-sm btn-success">
                          <BiDetail className="text-white" />
                        </button>
                      </Link>
                    ) : (
                      <>
                        <button disabled className="btn btn-sm btn-success">
                          <BiDetail className="text-white" />
                        </button>
                        <p className="text-xs text-red-600">Not Approved yet</p>
                      </>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => openModal(myArticle)}
                      className="btn btn-sm bg-blue-600 text-white"
                    >
                      <BiEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => deleteArticle(myArticle._id)}
                      className="btn btn-sm bg-red-600 text-white"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg lg:text-xl text-center font-EbGaramond py-4">
            Update Your Article
          </h3>
          {selectedArticle && (
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Article title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Article Title</span>
                </label>
                <input
                  type="text"
                  {...register("articleTitle")}
                  defaultValue={selectedArticle.articleTitle}
                  className="input input-bordered bg-[#31795A17]"
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
                  className="textarea textarea-bordered bg-[#31795A17]"
                />
              </div>
              {/* Current Image Preview

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Current Image</span>
                </label>
                <img
                  src={selectedArticle?.articleImage}
                  alt="Current Article"
                  className="w-32 h-32 object-cover rounded"
                />
              </div> */}

              {/* Publisher Name Dropdown*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Publisher Name</span>
                </label>
                <select
                  defaultValue=""
                  className="select select-bordered"
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
                />
              </div>
              <button
                type="submit"
                className="btn mt-5 bg-[#31795A] rounded-full text-white uppercase font-medium w-full text-base"
              >
                Update Article
              </button>
            </form>
          )}
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

export default MyArticles;
