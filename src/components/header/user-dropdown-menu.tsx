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
          <span className="text-sm">{email}</span>
        </DropdownMenuLabel>
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
                value="essentials"
                onValueChange={(value) => console.log(value)}
              >
                <DropdownMenuRadioItem value="essentials">
                  <Icons.circleCheck className="mr-2" />
                  Essentials
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="favorites">
                  <Icons.star className="mr-2" />
                  Favorites
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="popular">
                  <Icons.history className="mr-2" />
                  Popular
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              {/* <DropdownMenuCheckboxItem
                checked
                onCheckedChange={(checked) => console.log(checked)}
                onSelect={(e) => e.preventDefault()}
              >
                <Icons.graduationCap className="mr-2" /> Student
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked
                onCheckedChange={(checked) => console.log(checked)}
                onSelect={(e) => e.preventDefault()}
              >
                <Icons.presentation className="mr-2" /> Teacher
              </DropdownMenuCheckboxItem> */}
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
                checked
                onCheckedChange={(checked) => console.log(checked)}
                onSelect={(e) => e.preventDefault()}
              >
                <Icons.graduationCap className="mr-2" /> Student
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked
                onCheckedChange={(checked) => console.log(checked)}
                onSelect={(e) => e.preventDefault()}
              >
                <Icons.presentation className="mr-2" /> Teacher
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
