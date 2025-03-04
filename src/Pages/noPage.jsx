import { useEffect } from "react";
import "../Styles/noPage.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function NoPage() {
  useEffect(() => {
    toast.error("Page not Found!");
  }, []);

  return (
    <div>
      <h1 className="number">404</h1>
      <h6 className="error">PAGE NOT FOUND</h6>
      <ToastContainer />
    </div>
  );
}

export default NoPage;
