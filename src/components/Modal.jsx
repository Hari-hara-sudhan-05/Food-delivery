import { useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open,onClose, className = "" }) {
  const modal = useRef();

  useEffect(() => {
    if (open) {
      modal.current.showModal();
    }
    return () => modal.current.close(); // it will only work if the dependency changes in the future
  }, [open]);

  return createPortal(
    <dialog method="modal" ref={modal} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
