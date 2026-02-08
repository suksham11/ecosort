"use client";
import { useEffect } from "react";

export function useNotifications() {
  useEffect(() => {
    // Request notification permission on mount (browser only)
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      new Notification(title, {
        icon: "/logo.png",
        badge: "/logo.png",
        ...options,
      });
    }
  };

  const requestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const permission = await Notification.requestPermission();
      return permission === "granted";
    }
    return false;
  };

  return {
    sendNotification,
    requestPermission,
    isSupported: typeof window !== "undefined" && "Notification" in window,
    permission: typeof window !== "undefined" && "Notification" in window 
      ? Notification.permission 
      : "default",
  };
}

export default useNotifications;
