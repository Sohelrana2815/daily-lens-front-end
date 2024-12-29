import Swal from "sweetalert2";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUsers from "../../../Hooks/useUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const { allUsers, refetch } = useUsers();

  // const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const makeUserAdmin = (user) => {
    console.log(user);

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user?.name} an admin? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.patch(
          `/users-make-admin/${user._id}`
        );
        if (response.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            title: "User Promoted!",
            text: `${user?.name} has been successfully made an admin.`,
            icon: "success",
            draggable: true,
            confirmButtonText: "Okay",
          });
        }
      }
    });
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Profile Picture</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {allUsers.map((user) => (
              <tr key={user._id} className="hover">
                <th>{user.displayName}</th>
                <td>{user.email}</td>
                <td>
                  <img src={user.photoURL} className="w-10 lg:w-14" alt="" />
                </td>
                <td>
                  {user.isAdmin ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={() => makeUserAdmin(user)}
                      className="btn btn-xs btn-success text-white"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllUsers;
