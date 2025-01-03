import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useUsers from "../../../Hooks/useUsers";
// import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const { allUsers, refetch } = useUsers();

  const axiosPublic = useAxiosPublic();
  // const axiosSecure = useAxiosSecure();
  // Make admin function
  const makeUserAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user?.name} an admin? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Make Admin!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosPublic.patch(`/users/${user._id}`);
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
      <div className="overflow-x-auto min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4">
        <table className="w-full border-collapse table-auto rounded-lg shadow-md">
          {/* Table Head */}
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Serial No.
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Profile Picture
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Action
              </th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {allUsers.map((user, index) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-100 dark:hover:bg-slate-950 transition duration-300"
              >
                <td className="px-4 py-3 capitalize">{index + 1}</td>
                <td className="px-4 py-3 capitalize">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 lg:w-14 h-10 lg:h-14 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-3">
                  {user.isAdmin ? (
                    <span className="text-green-600 font-bold">Admin</span>
                  ) : (
                    <button
                      onClick={() => makeUserAdmin(user)}
                      className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-300"
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
