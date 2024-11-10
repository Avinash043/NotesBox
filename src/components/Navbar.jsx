import { NavLink } from 'react-router-dom'
import { NavbarData } from "../data/navbar";

function Navbar() {
  return (
    <div className="w-full h-[45px] flex justify-center items-center p-4 bg-[#3B1E54] gap-x-5">
    {NavbarData.map((link, idx) => (
      <NavLink
        key={idx}
        to={link.path}
        className={({ isActive }) =>
          isActive
            ? "text-[#9B7EBD] font-semibold text-xl"
            : "text-[#EEEEEE] font-medium text-xl"
        }
      >
        {link.title}
      </NavLink>
    ))}
  </div>
  )
}

export default Navbar
