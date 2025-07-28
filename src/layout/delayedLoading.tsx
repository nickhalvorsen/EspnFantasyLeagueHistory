import React, { useState, useEffect } from "react";

type DelayedLoadingProps = {
  isLoading: boolean;
  delay?: number;
  children?: React.ReactNode;
};

function DelayedLoading({
  isLoading,
  delay = 1500,
  children = "Loading...",
}: DelayedLoadingProps) {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Start a timer to show the loader after delay
      const timer = setTimeout(() => setShowLoading(true), delay);
      return () => clearTimeout(timer); // Cleanup if loading finishes early
    } else {
      // Not loading, hide the loader immediately
      setShowLoading(false);
    }
  }, [isLoading, delay]);

  if (!isLoading) {
    // Not loading, render nothing
    return null;
  }

  // Show loading indicator only if the delay has passed
  return showLoading ? <div>{children}</div> : null;
}

export { DelayedLoading };
