import Image from "next/image";

const SocialMedia = ({ provider, handleInvite, src, alt }) => {
  return (
    <div
      className=" sm:scale-60 md:scale-80 lg:scale-100 hover:scale-[1.1] cursor-pointer hover:-translate-y-[6px] transition-all duration-300 ease-in-out"
      onClick={() => {
        handleInvite(provider);
      }}
    >
      <Image
        width={alt === "telegram" ? 40 : 50}
        height={alt === "telegram" ? 40 : 50}
        src={src}
        alt={alt}
      />
    </div>
  );
};

export default SocialMedia;
