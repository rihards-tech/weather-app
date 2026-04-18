import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function Toast(props) {
  const {
    message,
    isVisible,
    onClose,
    duration = 4000,
  } = props;

  const [progressWidth, setProgressWidth] = useState("100%");

  useEffect(() => {
    if (!isVisible) {
      setProgressWidth("100%");
      return;
    }

    setProgressWidth("100%");

    const frameId = requestAnimationFrame(() => {
      setProgressWidth("0%");
    });

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isVisible, message]);

  return (
    <div
      className={`
        fixed top-5 right-5 z-100
        w-full max-w-sm
        overflow-hidden
        rounded-3xl
        border border-white/15
        bg-black/45
        p-4
        text-white
        backdrop-blur-2xl
        shadow-[0_12px_40px_rgba(0,0,0,0.18)]
        transition-all duration-300 ease-out

        ${isVisible
          ? "translate-x-0 opacity-100 pointer-events-auto"
          : "translate-x-full opacity-0 pointer-events-none"}
      `}
    >
      <button
        type="button"
        onClick={onClose}
        className="
          absolute top-3 right-3
          flex h-8 w-8 items-center justify-center
          rounded-full
          bg-white/10
          text-white/80
          transition hover:bg-white/20 hover:text-white
        "
        aria-label="Close notification"
      >
        <IoClose className="text-xl" />
      </button>

      <div className="flex items-start gap-3 pr-10">
        <div
          className="
            mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center
            rounded-full
            bg-white/10
          "
        >
          <FaCircleExclamation className="text-base text-white/90" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-semibold tracking-tight">
            Something went wrong
          </p>
          <p className="mt-1 text-sm text-white/75">
            {message}
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
        <div
          className="h-full bg-white/70"
          style={{
            width: progressWidth,
            transition: isVisible ? `width ${duration}ms linear` : "none",
          }}
        />
      </div>
    </div>
  );
}