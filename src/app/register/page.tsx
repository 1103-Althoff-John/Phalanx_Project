"use client"
import React, { useState } from "react";
import Link from "next/link"
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const router = useRouter();
    const emailChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setEmail(e.target.value.trim());
    };
    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setpassword(e.target.value);
    };
    const RePassChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setRePassword(e.target.value);
    }
    const submitAction = async (e: React.FormEvent)=>{
        e.preventDefault();
        try{
            const serverRequest = await fetch("/api/auth/register_a", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });
            const serverResult = await serverRequest.json();
            console.log(serverResult);
            const session = await signIn(
                "credentials",
                {
                    redirect: false,
                    email,
                    password
                }
            );
            router.push("/");
        }
        catch{
            console.error("Failed to Register");
        }
    }
    return(
        <div 
            className="min-h-screen flex-col items-center flex-grow"
        >
            <h1 
                className="text-center font-bold text-xl text-white text-center mt-20 mb-5 underline"
            >
                Register
            </h1>
            <form 
                className=" space-y-2 border-2 border-white-100 rounded bg-black-100 p-10 w-full max-w-md mx-auto"
                onSubmit={submitAction}
            >
                <div 
                    id = "email" 
                    className="ml-[-8%]"
                >
                    <label 
                      htmlFor="email"
                    >
                        Email:
                    </label>
                    <input 
                        type="text" 
                        name="email" 
                        value={email}
                        className="border border-white-300 rounded p-1 ml-[2%] w-full"
                        placeholder="Example@gmail.com"
                        required
                        onChange={emailChange}
                    ></input>
                </div>
                <div 
                    id = "password" 
                    className="ml-[-8%]"
                >
                    <label 
                     htmlFor="password"
                    >
                        Password:
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        value={password}
                        className="border border-whit-300 rounded p-1 ml-[2%] w-full"
                        placeholder="Enter password"
                        required
                        onChange={passwordChange}
                    ></input>
                </div>
                <div 
                    id = "Re-password" 
                    className="ml-[-8%]"
                >
                    <label 
                     htmlFor="password"
                    >
                        Re-Enter Password:
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        value={rePassword}
                        className="border border-whit-300 rounded p-1 ml-[2%] w-full"
                        placeholder="Re-Enter password"
                        required
                        onChange={RePassChange}
                    ></input>
                </div>
                <div 
                    id="Reg-button"
                >
                    <button 
                    className="w-full border border-white-400 rounded text-sm py-2 font-semibold transition cursor-pointer hover:bg-purple-900 mt-2"
                    >
                        Submit
                    </button>
                </div>
                <div 
                className="flex justify-center mt-4"
                >
                    <Link
                        id="reg-link"
                        href="./login"
                        className="text-cyan-300 underline cursor-pointer text-sm hover:text-blue-700"
                    >
                        Already have an Account?
                    </Link>
                </div>
            </form>
        </div>
    );
}