// import { useEffect, useState } from "react";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";

import useUsers from "../../../Hooks/useUsers";

const AllUsers = () => {
  const { allUsers } = useUsers();
  //   const axiosPublic = useAxiosPublic();
  //   const [users, setUsers] = useState([]);
  //   useEffect(() => {
  //     axiosPublic.get("/users").then((response) => {
  //       setUsers(response.data);
  //     });
  //   }, [axiosPublic]);

  return <div>{allUsers.length}</div>;
};

export default AllUsers;
