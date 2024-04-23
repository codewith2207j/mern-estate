import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePer] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePer(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData({
            ...formData,
            avatar: downloadUrl,
          });
        });
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    e.preventDefault;
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await axios.post(
        `/api/user/update/${currentUser._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(updateUserSuccess(res.data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  useEffect(() => {
    setFormData({
      username: currentUser.username,
      email: currentUser.email,
      password: currentUser.password,
      photo: currentUser.avatar,
    });
  }, []);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Profile
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              src={formData.avatar || currentUser.avatar}
              alt="profile"
              className="rounded-full w-24 h-24 self-center object-cover cursor-pointer m-2"
            />
            <p>
              {fileUploadError ? (
                <span className="text-red-700 self-center">
                  Error Image uploading
                </span>
              ) : filePer > 0 && filePer < 100 ? (
                <span className="text-slate-700 self-center">{`Uploading ${filePer}% completed`}</span>
              ) : filePer === 100 ? (
                <span className="text-green-700 self-center">
                  Image uploaded successfully
                </span>
              ) : (
                ""
              )}
            </p>
            <div>
              <div className="mt-2">
                <input
                  id="username"
                  onChange={handleChange}
                  name="username"
                  type="text"
                  defaultValue={currentUser.username}
                  autoComplete="username"
                  placeholder="username"
                  required
                  value={formData.username}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                />
              </div>
            </div>
            <div>
              <div className="mt-2">
                <input
                  id="email"
                  onChange={handleChange}
                  name="email"
                  type="email"
                  defaultValue={currentUser.email}
                  placeholder="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <input
                  id="password"
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                />
              </div>
            </div>

            {/* {error && (
              <div className="pb-4 text-red-700 float-start">
                Error: {error}
              </div>
            )} */}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-blue-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 uppercase"
              >
                {loading ? "loading..." : "Update"}
              </button>
            </div>
          </form>
          <div>
            <button
              type="button"
              className="mt-5 flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 uppercase"
            >
              Create Listing
            </button>
          </div>

          <div className="flex justify-between mt-3">
            <span className="text-red-700 cursor-pointer">Delete Account</span>
            <span className="text-red-700 cursor-pointer">Sign Out</span>
          </div>
          <p>{error ? <span>{error}</span> : ""}</p>
        </div>
      </div>
    </>
  );
}
