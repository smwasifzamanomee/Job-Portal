"use client";

import { RefObject, useEffect, useRef } from "react";

const useOutsideClickHandler = <T extends HTMLElement>(
  cb: () => void
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const closeModal = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        cb();
      }
    };

    document.addEventListener("click", closeModal);

    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [ref, cb]);

  return ref;
};

export default useOutsideClickHandler;