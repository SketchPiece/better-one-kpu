import oneKpuLogo from "@/assets/one-kpu-logo.svg";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import SearchInput from "./search-input";
import UserDropdownMenu from "./user-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import kpuApi from "@/lib/kpu-api";

interface HeaderProps {
  searchText?: string;
  onSearchTextChange?: (searchText: string) => void;
}

export default function Header({
  searchText,
  onSearchTextChange,
}: HeaderProps) {
  const session = false;
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => kpuApi.getUserProfile(),
  });

  const handleSignIn = () => {
    window.location.href = "/?login=true";
  };

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex-1">
        <a
          href="#"
          className="block w-fit rounded-full p-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <img src={chrome.runtime.getURL(oneKpuLogo)} alt="One KPU Logo" />
        </a>
      </div>
      <SearchInput
        value={searchText}
        onChange={(e) => onSearchTextChange?.(e.target.value)}
      />

      <div className="flex flex-1 items-center justify-end gap-4">
        {userProfile && !isLoading ? (
          <>
            <Button variant="ghost" size="icon">
              <Icons.bellDot className="h-6 w-6" />
            </Button>
            <UserDropdownMenu
              username={userProfile.username}
              email={userProfile.email}
              initials={userProfile.initials}
            />
          </>
        ) : (
          <Button variant="ghost" onClick={handleSignIn}>
            <Icons.login className="mr-2" /> Sign In
          </Button>
        )}
      </div>
    </header>
  );
}
