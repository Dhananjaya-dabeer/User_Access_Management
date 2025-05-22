import { Flip, toast } from "react-toastify";

export const errorToaster = (error) => {
  toast.error(
    error?.response?.data?.message || error?.message || "Internal error",
    {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Flip,
    }
  );
};
export const successToaster = (message) => {
  toast.success(message || "Internal error", {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
  });
};
