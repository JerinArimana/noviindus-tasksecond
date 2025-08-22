"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginIllustation from "../../../components/loginIllustration";

interface VerifyOtpResponse {
  success: boolean;
  login: boolean;
  message: string;
  access_token?: string;
  refresh_token?: string;
  token_type?: string;
}

const VerifyOtp = () => {
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile") || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleVerifyOtp = async () => {
    if (!otp) {
      setMessage("❌ Please enter the OTP");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://nexlearn.noviindusdemosites.in/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ mobile, otp }),
        }
      );

      const data: VerifyOtpResponse = await res.json();
      console.log(data);

      if (data.success) {
        if (data.login) {
          localStorage.setItem("access_token", data.access_token || "");
          localStorage.setItem("refresh_token", data.refresh_token || "");
          router.push("/dashboard");
        } else {
          router.push(`/auth/create-profile?mobile=${mobile}`);
        }
      } else {
        setMessage("⚠️ " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#00000099] bg-blend-multiply bg-[url(/images/dark-nature-blue-bg.png)] bg-center bg-cover p-4">
      <div className="bg-gray-800 p-2 h-full md:min-h-[500px] rounded-lg shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        <LoginIllustation />
        <div className="bg-white w-full md:w-1/2 p-8 flex flex-col justify-between rounded-lg">
          <div>
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Enter OTP
            </h2>
            <p className="mb-6 text-gray-600">
              We’ve sent an OTP to your mobile {mobile}
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-lightGray mb-6 text-[11px]">
              Your 6 digit code is on its way. This can sometimes take a few
              moments to arrive.
            </p>
            <button className="cursor-pointer text-sm text-grayDark font-semibold underline">
              Resend Code
            </button>
          </div>
          <div className="relative">
            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="bg-gray-900 text-white py-3 w-full rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {message && (
              <p className="mt-1 text-sm text-center text-gray-700 absolute bt-0 w-full">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
