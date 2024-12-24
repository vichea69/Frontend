"use client";;
import React from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";


export default function BackgroundGradientDemo() {
    return (
        (<div>
            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                <img
                    src="https://imgs.search.brave.com/E7vbDt065Aer8sC4sH8nKBT6tqAYY-DpcoUY4-1nNKo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9hL2E3L1Jl/YWN0LWljb24uc3Zn/LzY0MHB4LVJlYWN0/LWljb24uc3ZnLnBu/Zw"
                    alt="jordans"
                    height="400"
                    width="400"
                    className="object-contain" />
                <p
                    className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    Air Jordan 4 Retro Reimagined
                </p>

                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    The Air Jordan 4 Retro Reimagined Bred will release on Saturday,
                    February 17, 2024. Your best opportunity to get these right now is by
                    entering raffles and waiting for the official releases.
                </p>
                <button
                    className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                    <span>Buy now </span>

                </button>
            </BackgroundGradient>
        </div>)
    );
}
