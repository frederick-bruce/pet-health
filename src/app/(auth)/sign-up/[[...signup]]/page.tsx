import { SignIn } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex items-center h-screen w-full">
      <SignIn />
    </div>
  );
};

export default Page;
