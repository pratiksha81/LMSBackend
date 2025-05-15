// hooks/useLoader.ts
import { useState } from "react";

export function useLoader(initialLoading = false) {
  const [loading, setLoading] = useState(initialLoading);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return { loading, startLoading, stopLoading };
}
