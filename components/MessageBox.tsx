"use client";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const MessageBox = () => {
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      window.history.replaceState(null, "", pathname);
    }, 5000);

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }, [pathname]);

  const searchParams = useSearchParams();

  const message = searchParams.get("message");
  const type = searchParams.get("type");

  if (!message || !isVisible) return null;

  const defaultClasses: ClassValue = "p-4 rounded-md m-2 text-center";

  if (type === "success") {
    return (
      <div className={cn(defaultClasses, "bg-green-500 text-white")}>
        {message}
      </div>
    );
  }

  return <div>{message}</div>;
};

export default MessageBox;
