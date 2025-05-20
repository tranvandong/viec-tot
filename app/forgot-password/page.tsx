"use client";

import type React from "react";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleContinue = () => {
    setStep(3);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    alert("Password reset successfully!");
    // Redirect to login page
    window.location.href = "/login";
  };

  const handleResend = () => {
    alert("Verification email resent!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Blue background with illustration */}
        <div className="w-full md:w-1/2 bg-blue-600 p-8 text-white flex flex-col items-center justify-center">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {step === 3
                ? "Set A Strong Password To Protect Your Account"
                : "Reset Your Password For Account Access"}
            </h1>
            <p className="text-blue-100 mb-8">
              Bảo mật tài khoản của bạn là ưu tiên hàng đầu của chúng tôi. Hãy
              đặt lại mật khẩu để tiếp tục truy cập vào tài khoản của bạn.
            </p>

            {/* Illustration */}
            <div className="mt-8 bg-white/10 rounded-lg p-4">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-center">
                  <span>Báo cáo công việc</span>
                  <div className="flex space-x-2">
                    <span className="text-xs px-2 py-1 bg-blue-500 rounded">
                      Ứng viên
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-500/50 rounded">
                      Công việc
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-10 gap-1 h-24">
                  {[7, 5, 8, 4, 3, 4, 2, 6, 5, 7].map((height, i) => (
                    <div key={i} className="flex flex-col justify-end">
                      <div
                        className="bg-blue-500 rounded-t"
                        style={{ height: `${height * 10}%` }}
                      ></div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-xs">
                  <span>T1</span>
                  <span>T2</span>
                  <span>T3</span>
                  <span>T4</span>
                  <span>T5</span>
                  <span>T6</span>
                  <span>T7</span>
                  <span>T8</span>
                  <span>T9</span>
                  <span>T10</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="flex justify-end mb-8">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={"/logo.png"}
                  width={120}
                  height={60}
                  alt="logo viec tot"
                />
              </Link>
            </div>

            {/* Step 1: Enter Email */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Quên mật khẩu</h2>
                <p className="text-gray-500 mb-6">
                  Đừng lo lắng, chúng tôi sẽ gửi cho bạn hướng dẫn để đặt lại
                  mật khẩu
                </p>

                <form onSubmit={handleSubmitEmail}>
                  <div className="mb-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập email của bạn"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mb-4"
                  >
                    Đặt lại mật khẩu
                  </button>

                  <Link
                    href="/login"
                    className="block text-center text-gray-500 hover:text-gray-700"
                  >
                    Quay lại
                  </Link>
                </form>
              </div>
            )}

            {/* Step 2: Email Sent */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Quên mật khẩu</h2>
                <p className="text-gray-500 mb-6 text-center">
                  Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn
                  <br />
                  <span className="font-medium text-gray-800">{email}</span>
                </p>

                <button
                  onClick={handleContinue}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 mb-4"
                >
                  Tiếp tục
                </button>

                <Link
                  href="/login"
                  className="block text-center text-gray-500 hover:text-gray-700 mb-4"
                >
                  Quay lại đăng nhập
                </Link>

                <div className="text-center text-sm text-gray-500">
                  Không nhận được email?{" "}
                  <button
                    onClick={handleResend}
                    className="text-blue-600 hover:underline"
                  >
                    Gửi lại
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Set New Password */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-2">Đặt mật khẩu mới</h2>
                <p className="text-gray-500 mb-6">
                  Mật khẩu mới phải khác với mật khẩu đã sử dụng trước đây
                </p>

                <form onSubmit={handleResetPassword}>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Mật khẩu
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Nhập lại mật khẩu
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                  >
                    Đặt lại mật khẩu
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
