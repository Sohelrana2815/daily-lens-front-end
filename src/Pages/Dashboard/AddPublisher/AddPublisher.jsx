import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import publisherImg from "../../../assets/Add Publisher img/publisherImg.webp";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
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

        const publisherResponse = await axiosSecure.post(
          "/publishers",
          publisherData
        );

        if (publisherResponse.data.insertedId) {
          reset();
          enqueueSnackbar("Publisher added successfully!");
        }
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error While Adding Publisher", error);
    }
  };
  return (
    <>
      <SnackbarProvider
        variant="info"
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900 p-6">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg max-w-lg w-full p-8">
            {/* Title and Subtitle */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                Add Publisher
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fill out the details to create a new publisher profile.
              </p>
            </div>

            {/* Publisher Image */}
            <div className="text-center mb-6">
              <div className="relative w-28 h-28 mx-auto">
                {publisherImg ? (
                  <img
                    src={publisherImg}
                    alt="Publisher Logo"
                    className="rounded-full border-4 border-primary shadow-lg object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    No Image
                  </div>
                )}
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Publisher Name */}
              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Publisher Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Publisher Name"
                  {...register("publisherName")}
                  className="input input-bordered border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 w-full rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              {/* Publisher Image */}
              <div className="form-control">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Publisher Logo/Image
                </label>
                <input
                  type="file"
                  {...register("publisherImage")}
                  className="file-input file-input-bordered border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 w-full rounded-md shadow-sm focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="form-control">
                <button
                  type="submit"
                  className="btn btn-primary w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 rounded-md shadow-md transition-transform transform hover:scale-105"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </SnackbarProvider>
    </>
  );
};

export default AddPublisher;
