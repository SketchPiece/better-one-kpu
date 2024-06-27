import {
  Bell,
  LucideIcon,
  SearchIcon,
  TrendingUp,
  Star,
  Settings2,
  LogOut,
  MessageCircle,
  LucideProps,
  UserCog,
  LogIn,
  GraduationCap,
  CircleCheck,
  History,
  Eye,
  ArrowUp,
  BriefcaseBusiness,
  Apple,
  SunMoon,
  Sun,
  Moon,
  MonitorSmartphone,
  Inbox,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  search: SearchIcon,
  bell: Bell,
  trandingUp: TrendingUp,
  filters: Settings2,
  logout: LogOut,
  feedback: MessageCircle,
  roles: UserCog,
  login: LogIn,
  briefcaseBusiness: BriefcaseBusiness,
  apple: Apple,
  graduationCap: GraduationCap,
  circleCheck: CircleCheck,
  history: History,
  eye: Eye,
  arrowUp: ArrowUp,
  appearance: SunMoon,
  sun: Sun,
  moon: Moon,
  system: MonitorSmartphone,
  starOutline: Star,
  inbox: Inbox,
  star: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  darkClose: (props: LucideProps) => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        className="fill-white dark:fill-black"
        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="text-black dark:text-white"
        d="M15 9L9 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="text-black dark:text-white"
        d="M9 9L15 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  bellDot: (props: LucideProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19.4 14.9C20.2 16.4 21 17 21 17H3s3-2 3-9c0-3.3 2.7-6 6-6 .7 0 1.3.1 1.9.3" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      <circle cx="18" cy="8" r="3" stroke="#862533" fill="#862533" />
    </svg>
  ),
  facebook: (props: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 4.5H14.25C13.2554 4.5 12.3016 4.89509 11.5983 5.59835C10.8951 6.30161 10.5 7.25544 10.5 8.25V10.5H8.25V13.5H10.5V19.5H13.5V13.5H15.75L16.5 10.5H13.5V8.25C13.5 8.05109 13.579 7.86032 13.7197 7.71967C13.8603 7.57902 14.0511 7.5 14.25 7.5H16.5V4.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  instagram: (props: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_405_379)">
        <path
          d="M15.75 4.5H8.25C6.17893 4.5 4.5 6.17893 4.5 8.25V15.75C4.5 17.8211 6.17893 19.5 8.25 19.5H15.75C17.8211 19.5 19.5 17.8211 19.5 15.75V8.25C19.5 6.17893 17.8211 4.5 15.75 4.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.9998 11.5275C15.0923 12.1517 14.9857 12.7891 14.6951 13.3492C14.4045 13.9093 13.9446 14.3635 13.381 14.6472C12.8174 14.9309 12.1786 15.0297 11.5556 14.9294C10.9326 14.8292 10.3571 14.535 9.91091 14.0889C9.46472 13.6427 9.17058 13.0671 9.07033 12.4441C8.97008 11.8211 9.06883 11.1824 9.35253 10.6188C9.63622 10.0551 10.0904 9.59529 10.6505 9.30466C11.2106 9.01404 11.8481 8.90742 12.4723 8.99998C13.109 9.0944 13.6984 9.39108 14.1536 9.84621C14.6087 10.3013 14.9054 10.8908 14.9998 11.5275Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.125 7.875H16.1325"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_405_379">
          <rect
            width="18"
            height="18"
            fill="white"
            transform="translate(3 3)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
  x: (props: LucideProps) => (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_405_376)">
        <path
          d="M17.176 4H19.936L13.9061 10.892L21 20.2703H15.4454L11.0951 14.5823L6.11727 20.2703H3.35539L9.80498 12.8986L3 4H8.69528L12.6277 9.19891L17.176 4ZM16.2073 18.6181H17.7367L7.86432 5.5654H6.22323L16.2073 18.6181Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_405_376">
          <rect
            width="18"
            height="16.2703"
            fill="white"
            transform="translate(3 4)"
          />
        </clipPath>
      </defs>
    </svg>
  ),
};
