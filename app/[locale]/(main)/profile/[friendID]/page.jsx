"use client";
import { GetAllUsers } from "@/app/context/FetchAllUsers";
import { useMemo, useState } from "react";

const Page = ({ params }) => {
  const { users } = GetAllUsers();

  const setUser = useMemo(() => {
   return users.find((user) => user.id === params.friendID);
  }, []);
  console.log(setUser);
  return <div className="h-screen">{params.friendID}</div>;
};

export default Page;
