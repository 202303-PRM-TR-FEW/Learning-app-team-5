"use client";
import { useState } from "react";
import Questions from "@/components/Discussions-page-components/Quistions";
import TextInput from "@/components/Discussions-page-components/TextInput";

const Page = () => {
  const [Error, setError] = useState(null);
  return (
    <div
      className="container mx-auto px-4 min-h-screen
    max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1370px] 3xl:w-[1650px] dark:text-bodyWhite"
    >
      <TextInput Error={Error} setError={setError} />
      <Questions Error={Error} setError={setError} />
    </div>
  );
};

export default Page;
