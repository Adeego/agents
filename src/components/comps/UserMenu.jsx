import agentStore from "@/Store/AgentStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const logout = agentStore((state) => state.clearAgent);
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="size-10 text-neutral-700 hover:text-black grid place-items-center border border-neutral-200 rounded-full outline-none">
        <UserRound size={18} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="left"
        className="bg-white mr-4 rounded-[0.3rem] !w-36 shadow-neutral-100"
      >
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {/* <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={() => {
            navigate("/login");
            logout();
          }}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
