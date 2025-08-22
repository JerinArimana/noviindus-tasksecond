import React, { useState, ChangeEvent } from "react";
import LoginIllustation from "../../../components/loginIllustration";

import { useRouter } from "next/navigation";
interface SendOtpResponse {
  success: boolean;
  message: string;
}

const Login = () => {
  const [mobile, setMobile] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSendOtp = async (): Promise<void> => {
    if (!/^\d{10}$/.test(mobile)) {
      setMessage("❌ Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setMessage("");

    const formattedMobile = `+91${mobile.trim()}`;

    try {
      const res = await fetch(
        "https://nexlearn.noviindusdemosites.in/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({ mobile: formattedMobile }),
        }
      );

      const data: SendOtpResponse = await res.json();
      console.log(data, "login...");

      if (data.success) {
        setMessage("✅ " + data.message);
        router.push(
          `/auth/verify-otp?mobile=${encodeURIComponent(formattedMobile)}`
        );
      } else {
        setMessage("⚠️ " + data.message);
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setMobile(e.target.value);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#00000099] bg-blend-multiply bg-[url(/images/dark-nature-blue-bg.png)] bg-center bg-cover p-4">
        <div className="bg-gray-800  p-2 h-full md:min-h-[500px] rounded-lg shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
          <LoginIllustation />

          <div className="bg-white  w-full md:w-1/2 p-8 flex flex-col rounded-lg justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-grayDark font-inter">
                Enter your phone number
              </h2>
              <p className="mb-6 text-grayDark text-base">
                We use your mobile number to identify your account
              </p>

              <div className="flex items-center border border-hashGray rounded-lg p-3 mb-4">
                <span className="mr-2 text-gray-600">🇮🇳 +91</span>
                <input
                  type="tel"
                  placeholder="1234567891"
                  value={mobile}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setMobile(e.target.value)
                  }
                  className="flex-1 outline-none text-base"
                />
              </div>

              <p className="text-xs text-lightGray mb-6 text-[11px]">
                By tapping Get Started, you agree to the{" "}
                <a href="#" className="text-grayDark underline">
                  Terms & Conditions
                </a>
              </p>
            </div>

            <div className="relative">
              <button
                onClick={handleSendOtp}
                disabled={loading}
                className="bg-gray-900 w-full text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Get Started"}
              </button>

              {message && (
                <p className="mt-2 text-sm text-center text-gray-700 absolute bt-0 w-full">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
