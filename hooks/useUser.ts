import { RootState } from "./../store/index";
import { useSelector } from "react-redux";

const useUser = () => {
  const user = useSelector((state: RootState) => state.userSlice.user);

  return { user };
};

export default useUser;
