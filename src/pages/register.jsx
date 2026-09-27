import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
const obj = yup.object({
  email: yup
    .string()
    .email("Write correctly")
    .required("! Email is required"),

  password: yup
    .string()
    .required("! Password is required")
    .min(8, "! The password must contain at least 8 characters."),

  name: yup
    .string()
    .required("Name is required")
})
const RegisterPageComponent = () => {
  const [registredModal, setRegistredModal] = useState(false);
  const openRegistredModal = () => {
    setRegistredModal(true)
  }
  const closeRegistredModal = () => {
    setRegistredModal(false)
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm({
    resolver: yupResolver(obj)
  })
  const handleRegister = (data) => {
    const us = JSON.parse(localStorage.getItem("users")) || []
    const check = us.some(
      (user) => user.email === data.email
    )
    if (check) {
      openRegistredModal()
      reset()
      return;
    }
    const newData = {
      ...data,
      id: Date.now()
    }
    us.push(newData)
    localStorage.setItem("users", JSON.stringify(us))
    reset()
  }

  return (
    <>
      <div className="max-w-[1260px] mx-auto px-[30px] flex justify-center mt-[20px]">
        <div className="flex flex-col w-[500px] shadow-[0_0_10px_rgba(128,128,128)] px-[30px] py-[15px] pb-[25px]">
          <div className="w-full font-bold text-[25px] flex justify-start pb-[5px]">
            Գրանցում
          </div>
          <form action="" className="flex flex-col gap-[15px]" onSubmit={handleSubmit(handleRegister)}>
            <div>
              <div className="flex flex-col gap-[15px]">
                <div>
                  <input {...register("name")} className={`w-full border  rounded-[18px] px-[15px] py-[5px] text-[15px] outline-none focus:outline-none ${errors.name ? "border-[#a52a2a]" : "border-[#afafaf]"}`} type="text" placeholder="Name" />
                  {errors.name && (
                    <p className="text-[#a52a2a]">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <input {...register("email")} className={`w-full border rounded-[18px] px-[15px] py-[5px] text-[15px] outline-none focus:outline-none ${errors.email ? "border-[#a52a2a]" : "border-[#afafaf]"}`} type="text" placeholder="Example@gmail.com" />
                  {errors.email && (
                    <p className="text-[#a52a2a]">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <input {...register("password")} className={`w-full border rounded-[18px] px-[15px] py-[5px] text-[15px] hover:border-[#4b4b4b] outline-none focus:outline-none ${errors.password ? "border-[#a52a2a]" : "border-[#afafaf]"}`} type="password" placeholder="password" />
                  {errors.password && (
                    <p className="text-[#a52a2a]">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button type="submit" className="w-full cursor-pointer  bg-[linear-gradient(195deg,rgba(9,9,121,1)_35%,rgba(0,212,255,1)_100%)] text-white py-[5px] rounded-[18px]">
                Գրանցվել
              </button>
            </div>
            <div>
              <Link to={"/login"} className="w-full flex justify-center rounded-[18px] border-2 border-transparent [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(195deg,rgba(9,9,121,1)_35%,rgba(0,212,255,1)_100%)_border-box] py-[5px]">Մուտք</Link>
            </div>
          </form>
        </div>
      </div>
      {registredModal && (
        <div className="absolute inset-0 bg-black/30 backdrop-blur-md  w-full h-full top-0 left-0 z-[888] flex justify-center items-center">
          <div className="relative w-[600px] h-[400px] border border-black flex justify-center items-center rounded-[30px] bg-white">
            <h1><p>Այս տվյալներով արդեն կա գրանցված օգտատեր</p></h1>
            <span onClick={closeRegistredModal} className="absolute top-2 right-8 cursor-pointer">X</span>
          </div>
        </div>
      )}
    </>

  )
}
export default RegisterPageComponent