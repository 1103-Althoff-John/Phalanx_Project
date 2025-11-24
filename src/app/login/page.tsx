'use client'
import { useState } from "react";

import Link from "next/link"
export default function login(){
    return(
        <div 
            className="min-h-screen flex-col items-center flex-grow"
        >
            <h1 
                className="text-center font-bold text-xl text-black text-center mt-20 mb-5 underline"
            >
                Login
            </h1>
            <form 
                className=" space-y-2 border-2 border-black-900 rounded bg-white p-10 w-full max-w-md mx-auto text-black"
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
                        //value={email}
                        name="email" 
                        className="border border-black-300 rounded p-1 ml-[2%] w-full"
                        placeholder="Example@gmail.com"
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
                        type="text" 
                        //value={password}
                        name="password" 
                        className="border rounded p-1 ml-[2%] w-full"
                        placeholder="Enter password"
                    ></input>
                </div>
                <div 
                    id="log-button"
                >
                    <button 
                    className="w-full border border-black-400 rounded text-sm py-2 font-semibold transition cursor-pointer hover:bg-purple-900 mt-2"
                    >
                        Submit
                    </button>
                </div>
                <div 
                className="flex justify-between mt-4"
                >
                    <Link
                        id="reg-link"
                        href="./register"
                        className="text-cyan-300 underline cursor-pointer text-sm hover:text-blue-700"
                    >
                        Make an account
                    </Link>

                    <Link
                        id="forgotten-pwd"
                        href="/"
                        className="text-cyan-300 underline cursor-pointer text-sm hover:text-blue-700"
                    >
                        Forgot Password?
                    </Link>
                </div>
            </form>
        </div>
    );
}