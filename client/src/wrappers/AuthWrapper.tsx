import React from "react";
import LoginImage from "@/assets/login_image.jpg";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="flex items-center justify-between h-screen p-4 w-screen overflow-x-hidden">
      {children}
      <div className="hidden lg:block w-1/2 h-full">
        <img
          src={LoginImage}
          alt="login_image"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default AuthWrapper;
