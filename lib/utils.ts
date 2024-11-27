import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getServerUrl = () => {
  return process.env.NEXT_PUBLIC_API_URL
}

export const calculateProgress = (createdAt: string, durationInMonth: number) => {
    const startDate = new Date(createdAt);
    console.log("Start date", startDate)
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + durationInMonth);
    const today = new Date();

    if (today < startDate) return 0; // Not started yet
    if (today > endDate) return 100; // Completed

    const totalDuration = endDate.getTime() - startDate.getTime();
    const elapsedDuration = today.getTime() - startDate.getTime();
    return Math.min(100, Math.round((elapsedDuration / totalDuration) * 100));
  }