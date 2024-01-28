"use client";

import Navbar from "./_components/Navbar";
import Advertising from "./_components/Advertising";
import Templates from "./_components/Templates";
import RecentProjects from "./_components/RecentProjects";
import { useSession } from "next-auth/react";

const Welcome = () => {
  const { data } = useSession();

  return (
    <>
      <Navbar image={data ? data.user.image : null} />
      <Advertising />
      <Templates />
      <RecentProjects />
    </>
  );
};

export default Welcome;
