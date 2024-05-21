import { PanelLeft } from "lucide-react";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between border-b border-neutral-200 h-16 pt-2  px-4">
      <div>
        <button className="size-10 text-neutral-700 hover:text-black grid place-items-center border border-neutral-200 rounded-[0.3rem] relative">
          <PanelLeft size={18} />
        </button>
      </div>
      <div className="flex items-center gap-2">
        <div>
          <UserMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
