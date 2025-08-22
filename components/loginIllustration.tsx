import Image from "next/image";
import BranLogo from "../public/images/brand-logo.svg";
import IllustationIMG from "../public/images/login-illustation-img.svg";
const LoginIllustation = () => {
  return (
    <>
      <div className="hidden md:flex w-1/2  justify-center p-6 ">
        <div className="text-center text-white flex justify-between flex-col">
         
          <Image
            src={BranLogo}
            alt="Picture of the author"
            width={264}
            height={83}
          />
          <Image
            src={IllustationIMG}
            alt="Picture of the author"
            width={335}
            height={260}
          />
        </div>
      </div>
    </>
  );
};

export default LoginIllustation;
