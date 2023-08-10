"use client";
import { GetAllUsers } from "@/app/context/FetchAllUsers";
import Image from "next/image";
import { useMemo, useState } from "react";

const Page = ({ params }) => {
  const { users } = GetAllUsers();

  const setUser = useMemo(() => {
    return users.find((user) => user.id === params.friendID);
  }, []);

  return (
    <div className="mx-auto px-4 dark:min-h-screen lg:max-w-[1280px] dark:text-bodyWhite">
      <Image
        className="rounded-full m-2"
        src={setUser.photoURL}
        height={150}
        width={150}
        priority={false} // {false} | {true}
        alt="user image"
      />
      <p>{setUser.username}</p>
      <p>{setUser.city}</p>
    </div>
  );
};

export default Page;
