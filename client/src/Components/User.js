import { useSelector } from "react-redux";

const User = () => {
  const user = useSelector((state) => state.users.user);
  const picURL = "http://localhost:3001/uploads/" + user.profilePic;
  
  return (
    <div>
      <img src={picURL} className="userImage" />
      <p>
        {/* <b>{user.fristname}</b>
        <br />
        <b>{user.lastname}</b>
<br/>
        {user.email} */}
      </p>
    </div>
  );
};

export default User;
