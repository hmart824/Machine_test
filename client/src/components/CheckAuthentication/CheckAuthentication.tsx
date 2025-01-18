'use client'
import React, { useEffect, useCallback, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { Triangle } from 'react-loader-spinner'
import axios from "axios";
import { useAppStore } from "@/store";

type ActionResult = {
  meta: {
    requestStatus: string;
  };
};

type Token = string;
interface JwtPayload {
  userId: string;
}

const CheckAuthentication = ({
  children , loading , setLoading
}: {
  children: React.ReactNode;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: Boolean
}) => {
  const router = useRouter();
  const {setUser} = useAppStore((state) => state);

  const token: Token | undefined = Cookies.get("authTOKEN");

  const retrieveUser = useCallback(async () => {
    try {
      setLoading(true);
      const decoded: JwtPayload = jwtDecode(token as string);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/users/${decoded.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to the Authorization header
        },
      });
      console.log("res" , res)

      if (res?.data?.success) {
        setUser(res?.data?.user);
        router.push("/dashboard");
      }

      
    } catch (error) {
      // console.log("error while fetching the user", error);
      router.push("/");
    }finally{
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
      if (!token) {
        router.push("/");
      } else {
        retrieveUser();
      }
  }, [router, retrieveUser, token]);

  if(loading){
    return <div className="h-[100svh] w-[100svw] flex justify-center items-center">
            <Triangle
              visible={true}
              height="100"
              width="100"
              color="#282D4D"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              />
            </div>
  }

  return <>{children}</>;
};

export default CheckAuthentication;