"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoginIllustation from "../../../components/loginIllustration";
import Image from "next/image";
import CameraIcon from "../../../public/images/camara-icon.svg";

interface CreateProfileResponse {
  success: boolean;
  access_token?: string;
  refresh_token?: string;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    qualification: string;
    district: string;
    profile_image: string;
  };
}

const CreateProfile = () => {
  const searchParams = useSearchParams();
  const mobile = searchParams.get("mobile") || "";
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [qualification, setQualification] = useState("");
  const [district, setDistrict] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !qualification || !district || !profileImage) {
      setMessage("⚠️ Please fill in all fields and upload a profile picture");
      return;
    }

    const formData = new FormData();
    formData.append("mobile", mobile);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("qualification", qualification);
    formData.append("district", district);
    formData.append("profile_image", profileImage);

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        "https://nexlearn.noviindusdemosites.in/auth/create-profile",
        {
          method: "POST",
          body: formData,
        }
      );

      const data: CreateProfileResponse = await res.json();
      console.log(data);

      if (data.success) {
        localStorage.setItem("access_token", data.access_token || "");
        localStorage.setItem("refresh_token", data.refresh_token || "");
        setMessage("✅ Profile created successfully!");
        router.push("/dashboard");
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
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
  return (
    <div className="min-h-screen flex items-center bg-[#00000099] bg-blend-multiply justify-center bg-[url(/images/dark-nature-blue-bg.png)] bg-cover bg-center p-4">
      <div className="bg-gray-800  p-2 h-full md:min-h-[500px] rounded-lg shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden">
        <LoginIllustation />
        <div className="bg-white w-full md:w-1/2 p-8 flex flex-col rounded-lg justify-between">
          <h2 className="text-2xl font-semibold mb-2 text-gray-800">
            Add Your Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-2">
            <div className="h-[330px] overflow-y-auto">
              <label className="relative w-[132px] h-[127px] m-auto mb-8 flex flex-col justify-center items-center cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-1 text-center hover:border-gray-500">
                {previewUrl ? (
                  <>
                    <Image
                      src={previewUrl}
                      alt="Profile Preview"
                      width={120}
                      height={117}
                      className="rounded-lg object-cover"
                      style={{ width: "100%", height: "100%" }}
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setProfileImage(null);
                        setPreviewUrl(null);
                      }}
                      className="flex justify-center items-center text-[12px] font-bold absolute top-[4px] right-[4px] w-[20px] h-[20px] bg-gray-500 text-white rounded-full"
                    >
                      X
                    </button>
                  </>
                ) : (
                  <span className="text-gray-500 block text-[9px]">
                    <span className="flex justify-center items-center mb-2">
                      <Image
                        src={CameraIcon}
                        width={24}
                        height={21}
                        alt="Camera Icon"
                      />
                    </span>
                    Add Your Profile Picture
                  </span>
                )}

                <input
                  id="profileImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <div className="min-h-[300px] flex flex-col gap-6">
                <input
                  type="text"
                  placeholder="Enter your Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your Qualification</option>
                  <option value="High School">High School</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">PhD</option>
                </select>

                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your District</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
            </div>

            <div></div>
          </form>
          <div className="relative">
            <button
              type="submit"
              disabled={loading}
              className="bg-gray-900 text-white py-3 w-full rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Get Started"}
            </button>
            {message && (
              <p className="mt-4 text-sm text-center text-gray-700 absolute bt-0 w-full">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
