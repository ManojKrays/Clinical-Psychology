import { useContext, useEffect } from "react";
import {
  UNSAFE_NavigationContext as NavigationContext,
  useLocation,
} from "react-router-dom";

export function usePrompt(message, when) {
  const navigator = useContext(NavigationContext).navigator;
  const location = useLocation();

  useEffect(() => {
    if (!when) return;

    const push = navigator.push;
    const replace = navigator.replace;

    navigator.push = (...args) => {
      if (window.confirm(message)) {
        navigator.push = push;
        navigator.replace = replace;
        navigator.push(...args);
      }
    };

    navigator.replace = (...args) => {
      if (window.confirm(message)) {
        navigator.push = push;
        navigator.replace = replace;
        navigator.replace(...args);
      }
    };

    return () => {
      navigator.push = push;
      navigator.replace = replace;
    };
  }, [navigator, message, when, location]);
}
