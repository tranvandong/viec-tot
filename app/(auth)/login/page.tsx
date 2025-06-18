"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const { mutate: login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const slides = [
    {
      title: "Kết nối với mọi nhà tuyển dụng.",
      description:
        "Mọi thứ bạn cần trong bảng điều khiển tìm kiếm công việc dễ dàng tùy chỉnh.",
    },
    {
      title: "Track your applications.",
      description:
        "Monitor your progress and never miss a follow-up opportunity.",
    },
    {
      title: "Get personalized job matches.",
      description:
        "Our AI matches your skills with the perfect job opportunities.",
    },
  ];

  const onSubmit = (data: any) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-10 lg:p-16">
        <div className="mb-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={"/logo.png"}
              width={120}
              height={60}
              alt="logo viec tot"
            />
          </Link>
        </div>

        <div className="max-w-md mx-auto w-full">
          <h1 className="text-3xl font-bold mb-2">
            Đăng nhập vào tài khoản của bạn
          </h1>
          <p className="text-gray-500 mb-8">
            Chào mừng bạn trở lại! Hãy đăng nhập để tiếp tục.
          </p>

          <div className="grid grid-cols-1 gap-4 mb-6">
            <button
              onClick={() => signIn("zalo")}
              className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.782 0.166016H27.199C33.2653 0.166016 36.8103 1.05701 39.9572 2.74421C43.1041 4.4314 45.5875 6.89585 47.2557 10.0428C48.9429 13.1897 49.8339 16.7347 49.8339 22.801V27.1991C49.8339 33.2654 48.9429 36.8104 47.2557 39.9573C45.5685 43.1042 43.1041 45.5877 39.9572 47.2559C36.8103 48.9431 33.2653 49.8341 27.199 49.8341H22.8009C16.7346 49.8341 13.1896 48.9431 10.0427 47.2559C6.89583 45.5687 4.41243 43.1042 2.7442 39.9573C1.057 36.8104 0.166016 33.2654 0.166016 27.1991V22.801C0.166016 16.7347 1.057 13.1897 2.7442 10.0428C4.43139 6.89585 6.89583 4.41245 10.0427 2.74421C13.1707 1.05701 16.7346 0.166016 22.782 0.166016Z"
                  fill="#0068FF"
                />
                <path
                  opacity="0.12"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M49.8336 26.4736V27.1994C49.8336 33.2657 48.9427 36.8107 47.2555 39.9576C45.5683 43.1045 43.1038 45.5879 39.9569 47.2562C36.81 48.9434 33.265 49.8344 27.1987 49.8344H22.8007C17.8369 49.8344 14.5612 49.2378 11.8104 48.0966L7.27539 43.4267L49.8336 26.4736Z"
                  fill="#001A33"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.779 43.5892C10.1019 43.846 13.0061 43.1836 15.0682 42.1825C24.0225 47.1318 38.0197 46.8954 46.4923 41.4732C46.8209 40.9803 47.1279 40.4677 47.4128 39.9363C49.1062 36.7779 50.0004 33.22 50.0004 27.1316V22.7175C50.0004 16.629 49.1062 13.0711 47.4128 9.91273C45.7385 6.75436 43.2461 4.28093 40.0877 2.58758C36.9293 0.894239 33.3714 0 27.283 0H22.8499C17.6644 0 14.2982 0.652754 11.4699 1.89893C11.3153 2.03737 11.1636 2.17818 11.0151 2.32135C2.71734 10.3203 2.08658 27.6593 9.12279 37.0782C9.13064 37.0921 9.13933 37.1061 9.14889 37.1203C10.2334 38.7185 9.18694 41.5154 7.55068 43.1516C7.28431 43.399 7.37944 43.5512 7.779 43.5892Z"
                  fill="white"
                />
                <path
                  d="M20.5632 17H10.8382V19.0853H17.5869L10.9329 27.3317C10.7244 27.635 10.5728 27.9194 10.5728 28.5639V29.0947H19.748C20.203 29.0947 20.5822 28.7156 20.5822 28.2606V27.1421H13.4922L19.748 19.2938C19.8428 19.1801 20.0134 18.9716 20.0893 18.8768L20.1272 18.8199C20.4874 18.2891 20.5632 17.8341 20.5632 17.2844V17Z"
                  fill="#0068FF"
                />
                <path
                  d="M32.9416 29.0947H34.3255V17H32.2402V28.3933C32.2402 28.7725 32.5435 29.0947 32.9416 29.0947Z"
                  fill="#0068FF"
                />
                <path
                  d="M25.814 19.6924C23.1979 19.6924 21.0747 21.8156 21.0747 24.4317C21.0747 27.0478 23.1979 29.171 25.814 29.171C28.4301 29.171 30.5533 27.0478 30.5533 24.4317C30.5723 21.8156 28.4491 19.6924 25.814 19.6924ZM25.814 27.2184C24.2785 27.2184 23.0273 25.9672 23.0273 24.4317C23.0273 22.8962 24.2785 21.645 25.814 21.645C27.3495 21.645 28.6007 22.8962 28.6007 24.4317C28.6007 25.9672 27.3685 27.2184 25.814 27.2184Z"
                  fill="#0068FF"
                />
                <path
                  d="M40.4867 19.6162C37.8516 19.6162 35.7095 21.7584 35.7095 24.3934C35.7095 27.0285 37.8516 29.1707 40.4867 29.1707C43.1217 29.1707 45.2639 27.0285 45.2639 24.3934C45.2639 21.7584 43.1217 19.6162 40.4867 19.6162ZM40.4867 27.2181C38.9322 27.2181 37.681 25.9669 37.681 24.4124C37.681 22.8579 38.9322 21.6067 40.4867 21.6067C42.0412 21.6067 43.2924 22.8579 43.2924 24.4124C43.2924 25.9669 42.0412 27.2181 40.4867 27.2181Z"
                  fill="#0068FF"
                />
                <path
                  d="M29.4562 29.0944H30.5747V19.957H28.6221V28.2793C28.6221 28.7153 29.0012 29.0944 29.4562 29.0944Z"
                  fill="#0068FF"
                />
              </svg>

              <span className="text-sm font-medium">Zalo</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-500">
              Hoặc tiếp tục với tài khoản
            </span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tài khoản"
                  {...register("username", { required: true })}
                />
              </div>
              {errors.email && <span>Vui lòng nhập tên tài khoản</span>}
            </div>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Mật khẩu"
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.email && <span>Vui lòng nhập mật khẩu</span>}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label> */}
              </div>
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bạn chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Tạo tài khoản
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Blue Background with Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[500px] h-[500px] bg-blue-500 rounded-full flex items-center justify-center">
            <div className="relative w-[400px] h-[400px]">
              {/* Circular icons */}
              <div className="absolute top-[50px] left-[50px] bg-white rounded-full p-4 shadow-lg">
                <div className="bg-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  VT
                </div>
              </div>
              <div className="absolute top-[150px] right-[50px] bg-white rounded-full p-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-blue-600"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </div>
              <div className="absolute bottom-[50px] left-[100px] bg-white rounded-full p-4 shadow-lg">
                <svg
                  className="w-10 h-10 text-blue-600"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M24 12.073c0-5.8-4.702-10.503-10.503-10.503S2.994 6.273 2.994 12.073c0 5.242 3.84 9.59 8.852 10.384v-7.344h-2.663v-3.04h2.663V9.75c0-2.63 1.566-4.085 3.968-4.085 1.15 0 2.35.205 2.35.205v2.584h-1.323c-1.304 0-1.71.81-1.71 1.64v1.97h2.91l-.465 3.04h-2.445v7.345c5.013-.795 8.853-5.142 8.853-10.384z" />
                </svg>
              </div>

              {/* Dashboard illustration */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-4 w-[250px]">
                <div className="flex items-center gap-1 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded-full"></div>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-3/4"></div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-2/3"></div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                    <div className="h-2 bg-gray-200 rounded-full w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-16 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">
            {slides[activeSlide].title}
          </h2>
          <p className="text-blue-100 mb-6">
            {slides[activeSlide].description}
          </p>

          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-2 h-2 rounded-full ${
                  activeSlide === index ? "bg-white" : "bg-blue-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
