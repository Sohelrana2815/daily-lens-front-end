import Select from "react-select";

const AddArticles = () => {
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

  return (
    <form className="card-body bg-gray-300">
      {/* Title Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title</span>
        </label>
        <input
          type="text"
          placeholder="Article Title"
          className="input input-bordered"
          required
        />
      </div>

      {/* Description Field */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <textarea
          placeholder="Article Description"
          className="textarea textarea-bordered"
          required
        />
      </div>

      {/* Image Upload */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Image</span>
        </label>
        <input type="file" className="input input-bordered" required />
      </div>

      {/* Publisher Dropdown */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Publisher</span>
        </label>
        <select className="select select-bordered" required>
          <option value="" disabled>
            Select Publisher
          </option>

          <option></option>
        </select>
      </div>

      {/* Tags Multi-Select */}
      <div className="form-control">
        <label className="label">
          <span className="label-text">Tags</span>
        </label>
        <Select isMulti options={tagOptions} className="basic-multi-select" />
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
