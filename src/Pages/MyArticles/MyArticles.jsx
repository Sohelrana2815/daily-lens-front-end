import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { BiDetail, BiEdit } from "react-icons/bi";
import Swal from "sweetalert2";

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

  // Update specific article
  const updateArticle = (id) => {
    console.log(id);
  };

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

  return (
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
                    onClick={() => updateArticle(myArticle._id)}
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
  );
};

export default MyArticles;
