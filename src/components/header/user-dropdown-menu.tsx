import { usePreferences } from "@/hooks/use-preferences";
import { Icons } from "../icons";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { QuickFiltersValue } from "../home/quick-filters";
import SimpleTooltip from "../ui/simple-tooltip";
import { useClipboard } from "@mantine/hooks";

function includeValue<T extends string>(array: T[], value: T) {
  if (array.includes(value)) {
    return [...array];
  }
  return [...array, value];
}

function excludeValue<T extends string>(array: T[], value: T) {
  return array.filter((item) => item !== value);
}

interface UserDropdownMenuProps {
  initials: string;
  username: string;
  email: string;
  onSignOut?: () => void;
}

export default function UserDropdownMenu({
  initials,
  username,
  email,
  onSignOut,
}: UserDropdownMenuProps) {
  const { preferences, updatePreference } = usePreferences();
  const clipboard = useClipboard({ timeout: 2000 });

  const handleRoleCheckboxChange = (
    role: "student" | "employee",
    checked: boolean,
  ) => {
    updatePreference(
      "roles",
      checked
        ? includeValue(preferences.roles, role)
        : excludeValue(preferences.roles, role),
    );
  };

  const copyEmailContent = clipboard.copied
    ? "Copied to your clipboard"
    : "Click to copy email address";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="font-medium">{username}</span>
          <SimpleTooltip
            content={copyEmailContent}
            side="bottom"
            open={clipboard.copied ? true : undefined}
          >
            <button onClick={() => clipboard.copy(email)} className="text-sm">
              {email}
            </button>
          </SimpleTooltip>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icons.eye className="mr-2" />
            <span>Default View</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuLabel className="px-3 py-2.5 font-medium">
                Select Default View
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={preferences.defaultView}
                onValueChange={(value) =>
                  updatePreference("defaultView", value as QuickFiltersValue)
                }
              >
                <DropdownMenuRadioItem value="essentials">
                  <Icons.circleCheck className="mr-2" />
                  Essentials
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="favorites">
                  <Icons.starOutline className="mr-2" />
                  Favorites
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="recent">
                  <Icons.history className="mr-2" />
                  Recent
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icons.roles className="mr-2" />
            <span>Roles</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuLabel className="px-3 py-2.5 font-medium">
                Select Roles
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={preferences.roles.includes("student")}
                onCheckedChange={(checked) =>
                  handleRoleCheckboxChange("student", checked)
                }
                onSelect={(e) => e.preventDefault()}
              >
                <Icons.graduationCap className="mr-2" /> Student
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={preferences.roles.includes("employee")}
                onCheckedChange={(checked) =>
                  handleRoleCheckboxChange("employee", checked)
                }
                onSelect={(e) => e.preventDefault()}
              >
                <Icons.briefcaseBusiness className="mr-2" /> Employee
              </DropdownMenuCheckboxItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>
          <Icons.feedback className="mr-2" />
          <span>Send Feedback</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSignOut}>
          <Icons.logout className="mr-2" /> Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="flex justify-around">
          <a href="#">
            <Icons.facebook className="h-7 w-7 text-[#747474] hover:text-black" />
          </a>
          <a href="#">
            <Icons.x className="h-7 w-7 text-[#747474] hover:text-black" />
          </a>
          <a href="#">
            <Icons.instagram className="h-7 w-7 text-[#747474] hover:text-black" />
          </a>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
