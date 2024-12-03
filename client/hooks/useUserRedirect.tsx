"use client";
import { useUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useRedirect = (redirect: string) => {
  const { userLoginStatus, isLoggin } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        if (isLoggin === false) {
          router.push(redirect);
        }
      } catch (error) {
        console.log("Error in redirecting User", error);
      }
    };

    redirectUser();
  }, [redirect, userLoginStatus, router]);
};

export default useRedirect;
