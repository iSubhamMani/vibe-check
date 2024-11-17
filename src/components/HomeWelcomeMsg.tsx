import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";

const DashboardWelcomeMsg = async () => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  const { user } = session;
  return (
    <div className="mt-8 lg:mt-16 px-6 md:px-8 lg:px-12 text-center">
      <h1 className="font-medium text-lg lg:text-xl xl:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-slate-500 to-slate-800">
        Welcome {user.name},
      </h1>
      <p className="text-balance font-medium py-2 h-full text-4xl md:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 to-purple-700">
        What are you vibing to today?
      </p>
    </div>
  );
};

export default DashboardWelcomeMsg;
