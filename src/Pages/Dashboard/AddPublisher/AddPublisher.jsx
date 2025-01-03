import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import publisherImg from "../../../assets/Add Publisher img/publisherImg.webp";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    try {
      // upload image on img bb then get url
      const imageFile = { image: data.publisherImage[0] };
      const response = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      console.log(response.data);

      if (response.data.success) {
        const publisherData = {
          publisherName: data.publisherName,
          publisherImage: response.data.data.display_url,
        };

        const publisherResponse = await axiosPublic.post(
          "/publishers",
          publisherData
        );

        if (publisherResponse.data.insertedId) {
          reset();
          alert("posted publisher!");
        }
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error While Adding Publisher", error);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 max-w-md mx-auto space-y-4"
        >
          <div className="text-center">
            {publisherImg && (
              <img
                src={publisherImg}
                alt="Publisher Logo"
                className="w-24 h-24 mx-auto rounded-full border border-gray-300 shadow-sm"
              />
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-300 font-semibold">
                Publisher Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Publisher Name"
              {...register("publisherName")}
              className="input input-bordered border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 w-full rounded-md shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-700 dark:text-gray-300 font-semibold">
                Publisher Logo/Image
              </span>
            </label>
            <input
              type="file"
              {...register("publisherImage")}
              className="file-input file-input-bordered border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 w-full rounded-md shadow-sm focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring focus:ring-blue-300 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPublisher;
