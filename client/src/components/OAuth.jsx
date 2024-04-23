import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleClick = async (e) => {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const { displayName, email, photoURL } = result.user;
      const res = await axios.post("/api/auth/google", {
        name: displayName,
        email,
        photo: photoURL,
      });
      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <button
      className="mt-3 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 uppercase"
      type="button"
      onClick={handleGoogleClick}
    >
      Continue with Google
    </button>
  );
}

export default OAuth;
