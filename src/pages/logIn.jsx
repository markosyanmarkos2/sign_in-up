import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";

const yupObj = yup.object({
  email: yup
    .string()
    .email("Write correctly")
    .required("! Email is required"),
  password: yup
    .string()
    .min(8, "! The password must contain at least 8 characters.")
    .required("! Password is required"),
});
const LogInPageComponent = () => {
  const navigate = useNavigate()
  const [loginModal, setLoginModal] = useState(false)
  const openLoginModal = () => {
    setLoginModal(true);
  }

  const closeLoginModal = () => {
    setLoginModal(false)
  }


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(yupObj)
  });

  const checkUser = (data) => {

    const getData = JSON.parse(localStorage.getItem("users")) || []

    const check = getData.find((el) => (
      el.email === data.email && el.password === data.password
    ))

    if (check) {
      navigate(`/user/${check.id}`)
    } else {
      openLoginModal()
      reset()
    }
  };

  return (
    <div className="max-w-[1260px] mx-auto px-[30px] flex justify-center mt-[20px]">
      <div className="flex flex-col w-[500px] shadow-[0_0_10px_rgba(128,128,128)] px-[30px] py-[15px] pb-[25px]">
        <div className="w-full font-bold text-[25px] flex justify-start pb-[5px]">
          Մուտք
        </div>
        <form action="" className="flex flex-col gap-[15px]" onSubmit={handleSubmit(checkUser)}>
          <div>
            <div className="flex flex-col gap-[15px]">
              <div>
                <input
                  type="text"
                  placeholder="email"
                  {...register("email")}
                  className={`w-full border rounded-[18px] px-[15px] py-[5px] text-[15px] outline-none focus:outline-none ${errors.email
                    ? "border-[#a52a2a]"
                    : "border-[#afafaf]"
                    }`}
                />
                {errors.email && (
                  <p className="text-[#a52a2a]">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password")}
                  className={`w-full border rounded-[18px] px-[15px] py-[5px] text-[15px] outline-none focus:outline-none ${errors.password || errors.root
                    ? "border-[#a52a2a]"
                    : "border-[#afafaf] hover:border-[#4b4b4b]"
                    }`}

                />
                {errors.password && (
                  <p className="text-[#a52a2a]">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <button type="submit" className="w-full cursor-pointer  bg-[linear-gradient(195deg,rgba(9,9,121,1)_35%,rgba(0,212,255,1)_100%)] text-white py-[5px] rounded-[18px]">Մուտք</button>
          </div>
          <div>
            <Link className="w-full flex justify-center rounded-[18px] border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(195deg,rgba(9,9,121,1)_35%,rgba(0,212,255,1)_100%)_border-box] py-[5px]" to={"/register"}>Գրանցում</Link>
          </div>
        </form>
      </div>
      {loginModal && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md  w-full h-full top-0 left-0 z-[888] flex justify-center items-center">
          <div className="relative w-[600px] h-[400px] border border-black flex justify-center items-center rounded-[30px] bg-white">
            <h1><p>Մուտքագրված տվյալներով օգտատեր չի գտնվել</p></h1>
            <span onClick={closeLoginModal} className="absolute top-2 right-8 cursor-pointer">X</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default LogInPageComponent