"use client";
import { useUserContext } from "@/context/userContext";
import React, { useEffect, useState } from "react";

interface Props {
  params: Promise<{
    verificationToken: string;
  }>;
}

function Page({ params }: Props) {
  const [verificationToken, setVerificationToken] = useState<string | null>(
    null
  );

  const { verifyUser } = useUserContext();

  useEffect(() => {
    async function resolveParams() {
      const resolvedParams = await params; // Resolve the promise
      setVerificationToken(resolvedParams.verificationToken);
    }

    resolveParams();
  }, [params]);

  if (!verificationToken) {
    return (
      <div className="auth-page flex flex-col justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="auth-page flex flex-col justify-center items-center">
      <div className="bg-white flex flex-col justify-center gap-[1rem] px-[4rem] py-[2rem] rounded-md">
        <h1 className="text-[#999] text-[2rem]">Verify Your Account</h1>
        <button
          className="px-4 py-2 self-center bg-blue-500 text-white rounded-md"
          onClick={() => {
            verifyUser(verificationToken);
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default Page;
