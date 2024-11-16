"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
  IconMail,
  IconPhone,
} from "@tabler/icons-react";
import Link from "next/link";

export default function CreateWrapped() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2>
        Create your Spotify Wrapped!
      </h2>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* Decade Dropdown */}
        <LabelInputContainer className="mb-4">
            <Label htmlFor="decade">Decade</Label>
            <select
                id="decade"
                className="w-full p-2 border rounded-md bg-white text-black"
            >
            {Array.from({ length: 11 }, (_, i) => 1920 + i * 10).map((year) => (
                <option key={year} value={year}>
                {year}s
                </option>
            ))}
            </select>
        </LabelInputContainer>

        {/* Date Range Dropdown */}
        <LabelInputContainer className="mb-4">
            <Label htmlFor="date-range">Date Range</Label>
            <select
                id="date-range"
                className="w-full p-2 border rounded-md bg-white text-black"
            >
            <option value="last-week">Last Week</option>
            <option value="last-month">Last Month</option>
            <option value="last-year">Last Year</option>
            <option value="last-twoyears">Last Two Years</option>
            <option value="all-time">All Time</option>
            </select>
        </LabelInputContainer>

        {/* Genre Dropdown */}
        <LabelInputContainer className="mb-4">
            <Label htmlFor="genre">Genre</Label>
            <select
                id="genre"
                className="w-full p-2 border rounded-md bg-white text-black"
            >
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="hip-hop">Hip-Hop</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
            {/* Add more genres as needed */}
            </select>
        </LabelInputContainer>

        {/* Artist Input */}
        <LabelInputContainer className="mb-4">
            <Label htmlFor="artists">Artist(s)</Label>
            <input
            id="artists"
            placeholder="Type artist names separated by commas"
            className="w-full p-2 border rounded-md bg-white text-black"
            />
        </LabelInputContainer>

        {/* Submit Button */}
        <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
        >
            Submit &rarr;
            <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
