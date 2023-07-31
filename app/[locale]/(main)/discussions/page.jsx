import Questions from "@/components/Discussions-page-components/Quistions";
import TextInput from "@/components/Discussions-page-components/TextInput";

const page = () => {
  return (
    <div
      className="container mx-auto px-4 min-h-screen
    max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-[1370px] 3xl:w-[1650px] dark:text-bodyWhite"
    >
      <TextInput />
      <Questions />
    </div>
  );
};

export default page;
