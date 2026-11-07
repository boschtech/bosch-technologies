import { useEffect } from "react";

export default function PageMeta({ title }) {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
}
