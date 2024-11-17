"use client";
import { signIn } from "next-auth/react";
import ShimmerButton from "./ShimmerButton";

const SignInButton = () => {
  const signInWithGoogle = async () => {
    const res = await signIn("google", { callbackUrl: "/dashboard" });

    if (res?.error) {
      console.log("Error signin in. Please try again later");
    }
  };

  return (
    <ShimmerButton content="Tune In With Google" onClick={signInWithGoogle} />
  );
};

export default SignInButton;
