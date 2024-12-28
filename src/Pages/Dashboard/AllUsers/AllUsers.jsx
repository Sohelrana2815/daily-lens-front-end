import useUsers from "../../../Hooks/useUsers";

const AllUsers = () => {
  const { allUsers } = useUsers();

  return (
    <>
      <div>
        <h3>{allUsers.length}</h3>
      </div>
    </>
  );
};

export default AllUsers;
