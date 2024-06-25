import { Icons } from "../icons";
import { Button } from "../ui/button";
import SearchInput from "./search-input";
import UserDropdownMenu from "./user-dropdown-menu";
import { useUserProfileQuery } from "@/hooks/api/use-user-profile-query";
import { useNotificationsQuery } from "@/hooks/api/use-notifications-query";
import NotificationsPopover from "../notification-popover";
import OneKpuLogo from "../one-kpu-logo";

interface HeaderProps {
  searchQuery?: string;
  onSearchQueryChange?: (searchQuery: string) => void;
}

export default function Header({
  searchQuery,
  onSearchQueryChange,
}: HeaderProps) {
  const { data: notifications } = useNotificationsQuery();
  const { data: userProfile, isLoading } = useUserProfileQuery();

  const handleSignIn = () => {
    window.location.href = "/?login=true";
  };

  const handleSignOut = () => {
    chrome.runtime.sendMessage(
      {
        type: "SIGN_OUT",
      },
      () => (window.location.href = "/"),
    );
  };

  return (
    <header className="flex items-center justify-between px-6 py-4">
      <div className="flex-1">
        <a
          href="#"
          className="block w-fit rounded-full p-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <OneKpuLogo />
        </a>
      </div>
      <SearchInput
        value={searchQuery}
        onChange={(e) => onSearchQueryChange?.(e.target.value)}
      />

      <div className="flex flex-1 items-center justify-end gap-4">
        {userProfile && !isLoading ? (
          <>
            <NotificationsPopover notifications={notifications} />
            <UserDropdownMenu
              username={userProfile.username}
              email={userProfile.email}
              initials={userProfile.initials}
              onSignOut={handleSignOut}
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
