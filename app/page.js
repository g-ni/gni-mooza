"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Projects from "./_components/Projects";
import Navbar from "./_components/Navbar";
import Categories from "./_components/Categories";
import { postRegister } from "./_utils/requests/auth";
import { useEffect } from "react";
import Advertising from "./_components/Advertising";

const Welcome = () => {
  const { data } = useSession();
  // useEffect(() => {
  //   if (data && data !== undefined) {
  //     const obj = {
  //       email: data.user.email,
  //       password: "123456",
  //     };
  //     postRegister(obj);
  //   }
  // }, []);

  return (
    <div>
      <Navbar image={data ? data.user.image : null} />
      <Advertising />
    </div>
  );
};

export default Welcome;
