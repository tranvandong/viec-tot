"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Code,
  Edit,
  Eye,
  EyeOff,
  LockIcon,
  Pencil,
  PhoneIcon,
  User,
} from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRegister } from "@/hooks/useAuth";
import { Button, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { set } from "date-fns";
import { useToast } from "@/hooks/use-toast";

enum Steps {
  Step1,
  Step2,
}

export default function RegisterPage() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [step, setStep] = useState(Steps.Step2);
  const [phone, setPhone] = useState("");
  const [registerData, setRegisterData] = useState({
    phoneNumber: "",
    otp: "",
    password: "",
    reEnterPassword: "",
    name: "",
  });
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleReEnterPassword, setIsVisibleReEnterPassword] =
    useState(false);
  const { mutateAsync: register, status } = useRegister();

  const onRegister = () => {
    register({
      phonenumber: registerData.phoneNumber,
      name: registerData.name,
      otp: registerData.otp,
      password: registerData.password,
    });
  };

  const onChangeInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };
  const isValidPhoneNumber = useMemo(() => {
    return (
      registerData.phoneNumber &&
      (isNaN(Number(registerData.phoneNumber)) ||
        registerData.phoneNumber.length !== 10)
    );
  }, [registerData.phoneNumber]);

  const isValid = useMemo(() => {
    if (
      !registerData.phoneNumber ||
      !registerData.name ||
      !registerData.otp ||
      !registerData.password ||
      !registerData.reEnterPassword
    ) {
      return false;
    }
    if (isValidPhoneNumber) {
      return false;
    }
    if (registerData.password !== registerData.reEnterPassword) {
      return false;
    }
    return true;
  }, [registerData]);

  const slides = [
    {
      title: "Connect with every employer.",
      description:
        "Everything you need in an easily customizable job search dashboard.",
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

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Registration Form */}
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
          <h1 className="text-3xl font-bold mb-2">Tạo tài khoản của bạn</h1>
          <p className="text-gray-500 mb-8">
            Tham gia Việc Tốt ngay hôm nay để tìm kiềm việc làm mơ ước của bạn!
          </p>

          {/* <div className="grid grid-cols-2 gap-4 mb-6">
            <button className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 12.073c0-5.8-4.702-10.503-10.503-10.503S2.994 6.273 2.994 12.073c0 5.242 3.84 9.59 8.852 10.384v-7.344h-2.663v-3.04h2.663V9.75c0-2.63 1.566-4.085 3.968-4.085 1.15 0 2.35.205 2.35.205v2.584h-1.323c-1.304 0-1.71.81-1.71 1.64v1.97h2.91l-.465 3.04h-2.445v7.345c5.013-.795 8.853-5.142 8.853-10.384z"
                  fill="#1877F2"
                />
              </svg>
              <span className="text-sm font-medium">Facebook</span>
            </button>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-sm text-gray-500">
              hoặc đăng ký bằng email
            </span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div> */}
          {/* {step === Steps.Step1 && (
            <>
              <Flex width={{ lg: "100%" }} direction="column" gap="3">
                <TextField.Root
                  size={"3"}
                  placeholder="Nhập số điện thoại của bạn"
                  className="w-full"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                >
                  <TextField.Slot>
                    <PhoneIcon height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
                <Button
                  size={"3"}
                  onClick={() => onSendOpt()}
                  loading={status === "pending"}
                >
                  Gửi OTP
                </Button>
              </Flex>
            </>
          )} */}
          {step === Steps.Step2 && (
            <>
              <Flex width={{ lg: "100%" }} direction="column" gap="4">
                <div>
                  <TextField.Root
                    size={"3"}
                    placeholder="Nhập số điện thoại của bạn"
                    className="w-full"
                    name="phoneNumber"
                    value={registerData.phoneNumber}
                    onChange={onChangeInput}
                  >
                    <TextField.Slot>
                      <PhoneIcon height="16" width="16" />
                    </TextField.Slot>
                    {/* <TextField.Slot>
                    <IconButton
                      variant="ghost"
                      onClick={() => setStep(Steps.Step1)}
                    >
                      <Pencil height="16" width="16" className="mr-2" />
                      <Text className="text-xs font-semibold">Sửa</Text>
                    </IconButton>
                  </TextField.Slot> */}
                  </TextField.Root>
                  {isValidPhoneNumber && (
                    <Text size="2" color="red">
                      Số điện thoại không hợp lệ
                    </Text>
                  )}
                </div>
                <TextField.Root
                  size={"3"}
                  placeholder="Nhập tên của bạn"
                  className="w-full"
                  name="name"
                  value={registerData.name}
                  onChange={onChangeInput}
                >
                  <TextField.Slot>
                    <User height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  size={"3"}
                  placeholder="Nhập mã OTP"
                  className="w-full"
                  name="otp"
                  value={registerData.otp}
                  onChange={onChangeInput}
                >
                  <TextField.Slot>
                    <Code height="16" width="16" />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  size={"3"}
                  placeholder="Nhập mật khẩu"
                  className="w-full"
                  type={isVisiblePassword ? "text" : "password"}
                  name="password"
                  value={registerData.password}
                  onChange={onChangeInput}
                >
                  <TextField.Slot>
                    <LockIcon height="16" width="16" />
                  </TextField.Slot>
                  <TextField.Slot>
                    <IconButton
                      variant="ghost"
                      onClick={() => setIsVisiblePassword((prev) => !prev)}
                    >
                      {isVisiblePassword ? (
                        <EyeOff height="16" width="16" />
                      ) : (
                        <Eye height="16" width="16" />
                      )}
                    </IconButton>
                  </TextField.Slot>
                </TextField.Root>
                <div>
                  <TextField.Root
                    size={"3"}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full"
                    type={isVisibleReEnterPassword ? "text" : "password"}
                    name="reEnterPassword"
                    value={registerData.reEnterPassword}
                    onChange={onChangeInput}
                  >
                    <TextField.Slot>
                      <LockIcon height="16" width="16" />
                    </TextField.Slot>
                    <TextField.Slot>
                      <IconButton
                        variant="ghost"
                        onClick={() =>
                          setIsVisibleReEnterPassword((prev) => !prev)
                        }
                      >
                        {isVisibleReEnterPassword ? (
                          <EyeOff height="16" width="16" />
                        ) : (
                          <Eye height="16" width="16" />
                        )}
                      </IconButton>
                    </TextField.Slot>
                  </TextField.Root>

                  {registerData.reEnterPassword &&
                    registerData.password &&
                    registerData.password !== registerData.reEnterPassword && (
                      <Text size="2" color="red">
                        Mật khẩu nhập lại không đúng
                      </Text>
                    )}
                </div>
                <Button
                  size={"3"}
                  onClick={() => onRegister()}
                  disabled={!isValid}
                  loading={status === "pending"}
                >
                  Đăng ký
                </Button>
              </Flex>
            </>
          )}
          {/* <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tên"
                    {...register("tenKhachHang", { required: true })}
                  />
                </div>
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
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Họ"
                    {...register("tenCuaHang", { required: true })}
                  />
                </div>
              </div>
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
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-700"
              >
                Tôi đồng ý với các{" "}
                <Link
                  href="/terms"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Điều khoản của chính sách dịch vụ
                </Link>{" "}
                và{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Quyền riêng tư
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Tạo tài khoản
            </button>
          </form> */}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bạn đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Đăng nhập
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
                  JW
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
