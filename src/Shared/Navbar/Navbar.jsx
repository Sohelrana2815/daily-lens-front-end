import "./Navbar.css";
const Navbar = () => {
  const showSideBar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "flex";
  };
  const hideSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
  };
  return (
    <nav>
      <ul className="sidebar">
        <li onClick={hideSidebar}>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 -960 960 960"
              width="26px"
              fill="#000000"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </a>
        </li>
        <li>
          <a href="#">Daily Lens</a>
        </li>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Products</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>

      <ul>
        <li>
          <a href="#">Daily Lens</a>
        </li>
        <li>
          <a href="" className="hideOnMobile">
            Blog
          </a>
        </li>
        <li>
          <a href="" className="hideOnMobile">
            Products
          </a>
        </li>
        <li>
          <a href="" className="hideOnMobile">
            About
          </a>
        </li>
        <li>
          <a href="" className="hideOnMobile">
            Contact
          </a>
        </li>
        <li>
          <a href="" className="hideOnMobile">
            Login
          </a>
        </li>
        <li className="menuButton" onClick={showSideBar}>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26px"
              viewBox="0 -960 960 960"
              width="26px"
              fill="#000000"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
