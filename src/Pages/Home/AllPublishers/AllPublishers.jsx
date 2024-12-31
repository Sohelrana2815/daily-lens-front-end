import usePublishers from "../../../Hooks/usePublishers";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
const AllPublishers = () => {
  const { publishers } = usePublishers();

  return (
    <>
      <SectionTitle titleStyle="Discover" title="All Publishers" />
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 dark:bg-gray-800 p-6">
          {publishers.map((publisher) => (
            <div
              key={publisher._id}
              className="bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl hover:bg-gray-200  overflow-hidden dark:bg-slate-900 "
            >
              <div className="relative h-40">
                <img
                  src={publisher.publisherImage}
                  alt={publisher.publisherName}
                  className="w-full h-full object-cover border-b-2 border-red-600"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 dark:text-slate-200">
                  {publisher.publisherName}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {publisher.description || "Publisher description goes here."}
                </p>
              </div>
              <div className="p-4 border-t flex justify-between">
                <button className="text-indigo-600 font-semibold hover:underline dark:text-indigo-100">
                  Share
                </button>
                <button className="text-indigo-600 font-semibold hover:underline dark:text-indigo-100">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllPublishers;
