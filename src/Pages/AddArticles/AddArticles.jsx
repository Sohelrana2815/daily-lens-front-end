import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticles = () => {
  const [publishers, setPublishers] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
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

  const {
    handleSubmit,
    register,
    // reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const articleTag = selectedTags.map((tag) => tag.value);

    try {
      const imageFile = { image: data.articleImage[0] };
      const response = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      console.log(response.data);

      if (response.data.success) {
        const articleData = {
          articleTitle: data.articleTitle,
          articleDescription: data.articleDescription,
          articleImage: response.data.data.display_url,
          publisherName: data.publisherName,
          articleTags: articleTag,
          postedDate: new Date(),
          status: "pending",
          authorName: user?.displayName,
          authorEmail: user?.email,
          authorPhoto: user?.photoURL,
          isPremium: "no",
        };
        console.log(articleData);

        const articleResponse = await axiosPublic.post(
          "/articles",
          articleData
        );

        if (articleResponse.data.insertedId) {
          console.log(articleResponse.data);
        }
      }
    } catch (error) {
      console.error("Error While Adding Article", error);
    }
  };

  useEffect(() => {
    axiosPublic
      .get("/publishers")
      .then((publishersResponse) => {
        setPublishers(publishersResponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosPublic]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card-body bg-gray-300 mt-40"
    >
      <h2 className="text-center">{publishers.length}</h2>
      {/* Title Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Article Title"
          className="input input-bordered"
          {...register("articleTitle", { required: true })}
        />
        {errors.title && (
          <span className="text-error">Title field is required</span>
        )}
      </div>

      {/* Description Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          placeholder="Article Description"
          className="textarea textarea-bordered"
          {...register("articleDescription", { required: true })}
        />
        {errors.description && (
          <span className="text-error">Description field is required</span>
        )}
      </div>

      {/* Image Upload */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Image</span>
        </label>
        <input
          type="file"
          className="input input-bordered"
          {...register("articleImage", { required: true })}
        />
        {errors.image && (
          <span className="text-error">Image field is required</span>
        )}
      </div>

      {/* Publisher Dropdown */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Publisher</span>
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
          <span className="text-error">Publisher field is required</span>
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
          onChange={(selectedOptions) => setSelectedTags(selectedOptions)}
          className="basic-multi-select"
        />
      </div>

      {/* Submit Button */}
      <div className="form-control mt-6">
        <button className="btn btn-primary" type="submit">
          Add Article
        </button>
      </div>
    </form>
  );
};

export default AddArticles;
