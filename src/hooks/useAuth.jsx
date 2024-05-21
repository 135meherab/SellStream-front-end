import { useSelector } from "react-redux";

function useAuth() {
  const auth = useSelector(state => state.auth);
  // console.log(auth.token)
    if(auth?.token){
      return true;
    }else{
      return false;
    }
}

export default useAuth;