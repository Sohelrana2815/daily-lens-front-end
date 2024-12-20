import { useForm } from "react-hook-form";

const AddPublisher = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
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
