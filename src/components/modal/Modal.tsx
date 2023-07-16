import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element | JSX.Element[];
}

export const ModalSmall: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return isOpen ? (
    <div className="w-full h-[100vh] top-0 left-0 fixed flex justify-center items-center z-40 font-Messiri">
      <div
        ref={modalRef}
        className="border rounded w-[600px] h-[280px] bg-black-100 relative"
      >
        <button onClick={onClose} className="absolute right-0 p-1">
          <lord-icon
            src="https://cdn.lordicon.com/jfhbogmw.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "32px", height: "32px" }}
          />
        </button>
        <div className="w-full h-full pt-2 flex justify-center">{children}</div>
      </div>
    </div>
  ) : null;
};

export const ModalMedium: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return isOpen ? (
    <div className="w-[1920px] h-[100vh] top-0 left-0 fixed flex justify-center items-center z-40 font-Messiri">
      <div
        ref={modalRef}
        className="border rounded w-[500px] h-[480px] bg-black-100 relative"
      >
        <button onClick={onClose} className="absolute right-0 p-1">
          <lord-icon
            src="https://cdn.lordicon.com/jfhbogmw.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "32px", height: "32px" }}
          />
        </button>
        <div className="w-full h-full pt-2 flex justify-center">{children}</div>
      </div>
    </div>
  ) : null;
};

export const ModalLarge: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return isOpen ? (
    <div className="w-[100vw] h-[100vh] top-0 left-0 fixed flex justify-center items-center z-40 font-Messiri">
      <div
        ref={modalRef}
        className="border rounded w-[500px] h-[730px] bg-black-100 relative"
      >
        <button onClick={onClose} className="absolute right-0 p-1">
          <lord-icon
            src="https://cdn.lordicon.com/jfhbogmw.json"
            trigger="hover"
            colors="primary:#ffffff"
            style={{ width: "32px", height: "32px" }}
          />
        </button>
        <div className="w-full h-full pt-2 flex justify-center">{children}</div>
      </div>
    </div>
  ) : null;
};
