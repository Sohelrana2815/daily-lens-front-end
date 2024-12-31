import { BsLinkedin, BsTwitterX } from "react-icons/bs";
import websiteLogo from "../../assets/Website logo/website logo.png";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-base-200 text-black">
      <footer className="footer bg-base-200 text-base-content p-10 dark:bg-slate-800 dark:text-slate-100">
        <nav>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4 dark:bg-slate-800 dark:text-slate-100">
        <aside className="grid-flow-col items-center">
          <img
            src={websiteLogo}
            className="w-24 dark:bg-slate-400 px-2 py-1 rounded-full"
            alt=""
          />
          <p>
            ACME Industries Ltd.
            <br />
            Providing reliable tech since 1992
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a>
              <BsTwitterX className="text-2xl" />
            </a>
            <a>
              <BsLinkedin className="text-2xl text-blue-600" />
            </a>
            <a>
              <FaFacebook className="text-2xl text-blue-500" />
            </a>
          </div>
        </nav>
      </footer>
    </footer>
  );
};

export default Footer;
