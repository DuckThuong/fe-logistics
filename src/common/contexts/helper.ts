import { useState, useEffect, useRef } from "react";

export const childrenPath = (path: string, param?: string) =>
  param ? path.replace(/:\w+\?/, param) : path.replace(/\/:\w+\?/, "");

export const validString = (value: string) => {
  if (!value) {
    return false;
  } else if (value.trim() === "") {
    return false;
  } else {
    return true;
  }
};

export const seatColor = (n: number) => {
  if (n <= 3) return "trip-card__seats--urgent";
  if (n <= 8) return "trip-card__seats--low";
  return "trip-card__seats--ok";
};

export const useCountdown = (initialSeconds: number) => {
  const [secs, setSecs] = useState(initialSeconds);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    ref.current = setInterval(() => {
      setSecs((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(ref.current!);
  }, []);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return `${mm}:${ss}`;
};

export const emptyString = (value: string) => {
  return value;
};

export const toRoman = (num: number): string => {
  if (num <= 0 || num > 3999) return "";

  const map: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  for (const [value, symbol] of map) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  return result;
};
