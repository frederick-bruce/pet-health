import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex items-center h-screen w-full">
      <SignUp />
    </div>
  );
};

export default Page;
