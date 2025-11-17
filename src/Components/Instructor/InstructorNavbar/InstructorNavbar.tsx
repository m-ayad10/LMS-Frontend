import navlogo from "../../../assets/Logo navbar.png";

function InstructorNavbar() {
  return (
    <>
      <nav className="navbar-cont">
        <div className="navbar">
          <div className="nav-start">
            <img src={navlogo} className="nav-logo" alt="" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default InstructorNavbar;
