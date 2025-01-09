import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import img1 from "../../assets/Add article Img/img1.avif";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticles = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const [publishers, setPublishers] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const { user } = useAuth();
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
    { value: "worldNews", label: "World News" },
    { value: "travel", label: "Travel" },
    { value: "art", label: "Art & Culture" },
    { value: "ai", label: "AI" },
    { value: "innovation", label: "Innovation" },
    { value: "climateChange", label: "Climate change" },
    { value: "environment", label: "Environment" },
    { value: "economy", label: "Economy" },
  ];

  const {
    handleSubmit,
    register,
    reset,
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
          imageDeleteUrl: response.data.data.delete_url, // Save delete URL here
          publisherName: data.publisherName,
          articleTags: articleTag,
          postedDate: new Date(),
          status: "pending",
          authorName: user?.displayName,
          authorEmail: user?.email,
          authorPhoto: user?.photoURL,
          isPremium: false,
        };
        console.log(articleData);

        const articleResponse = await axiosSecure.post(
          "/articles",
          articleData
        );

        if (articleResponse.data.insertedId) {
          reset();
          // alert("Article created successfully!");
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
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
    <>
      <SectionTitle
        title="Contribute"
        titleStyle="Your Story"
        subTitle="Share your voice with our readers and make an impact through your words."
      />
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src={img1}
              alt="Article Illustration"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Form Section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-1/2 bg-white shadow-lg p-6 rounded-lg space-y-4 dark:text-gray-700"
          >
            {/* Title Field */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                <span>Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter the article title"
                className="input input-bordered w-full"
                {...register("articleTitle", { required: true })}
              />
              {errors.articleTitle && (
                <span className="text-error text-sm">
                  Title field is required
                </span>
              )}
            </div>

            {/* Description Field */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                <span>Description</span>
              </label>
              <textarea
                placeholder="Write a brief description of the article"
                className="textarea textarea-bordered w-full"
                rows="4"
                {...register("articleDescription", { required: true })}
              />
              {errors.articleDescription && (
                <span className="text-error text-sm">
                  Description field is required
                </span>
              )}
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                <span>Upload Image</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                {...register("articleImage", { required: true })}
              />
              {errors.articleImage && (
                <span className="text-error text-sm">
                  Image field is required
                </span>
              )}
            </div>

            {/* Publisher Dropdown */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                <span>Publisher</span>
              </label>
              <select
                defaultValue=""
                className="select select-bordered w-full"
                {...register("publisherName", { required: true })}
              >
                <option value="" disabled>
                  Select a publisher
                </option>
                {publishers.map((publisher) => (
                  <option key={publisher._id} value={publisher.name}>
                    {publisher.publisherName}
                  </option>
                ))}
              </select>
              {errors.publisherName && (
                <span className="text-error text-sm">
                  Publisher field is required
                </span>
              )}
            </div>

            {/* Tags Multi-Select */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                <span>Tags</span>
              </label>
              <Select
                isMulti
                options={tagOptions}
                value={selectedTags}
                onChange={(selectedOptions) => setSelectedTags(selectedOptions)}
                className="basic-multi-select"
                placeholder="Select relevant tags"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition duration-300"
              >
                Add Article
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddArticles;
