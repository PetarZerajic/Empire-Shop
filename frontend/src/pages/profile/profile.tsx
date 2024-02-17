import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
export const Profile = () => {
  const { userInfo } = useSelector((state: RootState) => state.reducer.auth);

  return (
    <>
      <h1>Profile Page</h1>
      <h3>Name :{userInfo?.data.user.name}</h3>
    </>
  );
};
