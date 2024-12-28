import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
  const axiosPublic = useAxiosPublic();
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
      <form onSubmit={handleSubmit(onSubmit)} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Publisher Name</span>
          </label>
          <input
            type="text"
            placeholder="Write Publisher Name"
            {...register("publisherName")}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Publisher Logo/Image</span>
          </label>
          <input
            type="file"
            {...register("publisherImage")}
            className="file-input file-input-bordered w-full max-w-xs"
            required
          />
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AddPublisher;
