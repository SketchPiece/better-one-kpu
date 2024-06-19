import { z } from "zod";
import { Service } from "./types";
import { refineService } from "./refine-service";

const commonOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const tileSchema = z.object({
  title: z.string(),
  uniqueKey: z.string(),
  task: z.object({
    taskId: z.number(),
    tabletHighResolutionImageCdnUrl: z.string(),
  }),
});

const userProfileDataSchema = z.object({
  user: z.object({
    userId: z.number(),
    email: z.string(),
    userName: z.string(),
    userInitials: z.string(),
    greetingName: z.string(),
  }),
});

type UserProfileData = z.infer<typeof userProfileDataSchema>;

interface UserProfile {
  userId: number;
  email: string;
  username: string;
  initials: string;
  greetingName: string;
}

function mapUserProfile(userData: UserProfileData): UserProfile {
  return {
    userId: userData.user.userId,
    email: userData.user.email,
    username: userData.user.userName,
    initials: userData.user.userInitials,
    greetingName: userData.user.greetingName,
  };
}

const kpuApi = {
  getServices: async (searchText?: string) => {
    const rawCollectionData = await fetch(`/tasks`, {
      method: "POST",
      body: JSON.stringify({
        pageNumber: 0,
        mobile: false,
        mobileOnly: false,
        taskCollectionUniqueKey: searchText ? undefined : "_popular_",
        terms: searchText ? searchText : undefined,
      }),
      ...commonOptions,
    }).then((res) => res.json());

    const rawFeaturedTiles = rawCollectionData.taskCollections.find(
      (item: { uniqueKey: string }) => item.uniqueKey === "_featured_",
    ).tiles;
    const rawOtherTiles = rawCollectionData.taskCollections.find(
      (item: { uniqueKey: string }) => item.uniqueKey === "_popular_",
    ).tiles;

    const featuredServices: Service[] = rawFeaturedTiles.map(
      (rawTile: unknown, index: number) => {
        if (index === 0) console.log(rawTile);
        const parseResult = tileSchema.safeParse(rawTile);
        if (!parseResult.success) return null;
        const tile = parseResult.data;
        return refineService({
          id: tile.task.taskId,
          title: tile.title,
          image: tile.task.tabletHighResolutionImageCdnUrl,
          uniqueKey: tile.uniqueKey,
        });
      },
    );

    const otherServices: Service[] = rawOtherTiles.map(
      (rawTile: unknown, index: number) => {
        if (index === 0) console.log(rawTile);
        const parseResult = tileSchema.safeParse(rawTile);
        if (!parseResult.success) return null;
        const tile = parseResult.data;
        return refineService({
          id: tile.task.taskId,
          title: tile.title,
          image: tile.task.tabletHighResolutionImageCdnUrl,
          uniqueKey: tile.uniqueKey,
        });
      },
    );

    return {
      featured: featuredServices,
      other: otherServices,
    };
  },
  getUserProfile: async (): Promise<UserProfile | null> => {
    const rawProfileData = await fetch("/res/settings?module=store", {
      method: "GET",
      ...commonOptions,
    }).then((res) => res.json());
    console.log(rawProfileData);
    const parsedUserProfile = userProfileDataSchema.safeParse(rawProfileData);
    if (!parsedUserProfile.success) return null;
    const userProfile = mapUserProfile(parsedUserProfile.data);
    return userProfile;
  },
  getNotifications: async () => {
    // [
    //   {
    //     announcementId: 1481,
    //     title: "Under Maintenance: Banner",
    //     description:
    //       "<p>Banner is currently undergoing maintenance from Friday, June 14 at 8:00 PM to Sunday, June 16 at 12:00 PM.</p>\n<p>The following services are not currently available</p>\n<ul>\n<li>Admin Pages (Banner 9)</li>\n<li>Banner 9 apps (Student Registration Self-Service, Student Profile, Faculty Self-Service, Employee Dashboard, BDM, Communication Management)</li>\n<li>Online Self-Service (OSS.KPU.CA)</li>\n<li>FAST (Finance, HR, WebReq, PCARD, Budget, Student, etc)</li>\n<li>Integration to and from Banner (Elevate, EPBC, Degree Works, AdAstra, Moodle, etc.)</li>\n<li>Other Online Self-Services (Adobe Creative Cloud Consent, Submit SIN, View Personalized Booklist, KPU Card Request)</li>\n</ul>",
    //     subType: "TEXT",
    //     containerType: "SIDEBAR",
    //     dismissible: true,
    //     url: null,
    //     openInNewWindow: false,
    //     imageUrl: null,
    //     imageCaption: null,
    //     disableTaskLaunch: "NO",
    //     cmAnnouncement: false,
    //     canEdit: false,
    //     titleBarColorIndex: 0,
    //   },
    // ];
    // fetch("https://one.kpu.ca/announcement/list?dismissed=false", {
    //   headers: {
    //     accept: "application/json",
    //     "accept-language": "en-US,en;q=0.9,ru;q=0.8",
    //     priority: "u=1, i",
    //     "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126"',
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": '"macOS"',
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-origin",
    //     "x-requested-with": "XMLHttpRequest",
    //   },
    //   referrer: "https://one.kpu.ca/?login=true",
    //   referrerPolicy: "strict-origin-when-cross-origin",
    //   body: null,
    //   method: "GET",
    //   mode: "cors",
    //   credentials: "include",
    // });
    // fetch("https://one.kpu.ca/announcement/list?dismissed=false", {
    //   headers: {
    //     accept: "application/json",
    //     "accept-language": "en-US,en;q=0.9,ru;q=0.8",
    //     priority: "u=1, i",
    //     "sec-ch-ua": '"Not/A)Brand";v="8", "Chromium";v="126"',
    //     "sec-ch-ua-mobile": "?0",
    //     "sec-ch-ua-platform": '"macOS"',
    //     "sec-fetch-dest": "empty",
    //     "sec-fetch-mode": "cors",
    //     "sec-fetch-site": "same-origin",
    //     "x-requested-with": "XMLHttpRequest",
    //     cookie:
    //       "_gcl_au=1.1.2033723792.1718587124; nmstat=13bdb85f-7847-8985-bf49-daae77cc103d; _tt_enable_cookie=1; _ttp=TDhgekhDEp8ssxPIInRM-58N7GQ; _ga_35GTT5842T=GS1.1.1718587124.1.1.1718587168.16.0.0; _ga_NS3GRKF13W=GS1.1.1718587124.1.1.1718587168.0.0.0; _ga_RNJQSN4GNR=GS1.1.1718587124.1.1.1718587168.0.0.0; _ga_Q28H83E90T=GS1.1.1718587124.1.1.1718587168.0.0.0; _ga_2JLEPL1DXE=GS1.1.1718587124.1.1.1718587168.0.0.0; _gid=GA1.2.910038361.1718687887; JSESSIONID=61BEE5969A55947DE6DDF05EB50B5AF9; SESSION=MjUzZmJkMDktODdiNi00NTZiLWJlYjEtNTliODRjNmEwMjJh; XSRF-TOKEN=755d51f5-6bf3-426d-b531-394f54ca623e; _gat_gtag_UA_167208009_1=1; _ga_8ZBR9LY5WQ=GS1.1.1718687886.15.1.1718688678.0.0.0; _ga=GA1.2.2084888432.1718128754; AWSALBTG=0TdQ50qsRHlPc0ydUcBkxIL+UKhzrTmvbEAp13OCqMGHcJdLZfD98gcQsQ7MfmzSSiYehMDmS7x4/3fXKmHxu72YCIhJ+sZvEk2TeJhSGph9ovqfCvYCCqwAF2yMMbIZOIOohUyej9LqWUt53ZLiTQZhLrvEyKveV0HvTi7DtKWjBDLpIDw=; AWSALBTGCORS=0TdQ50qsRHlPc0ydUcBkxIL+UKhzrTmvbEAp13OCqMGHcJdLZfD98gcQsQ7MfmzSSiYehMDmS7x4/3fXKmHxu72YCIhJ+sZvEk2TeJhSGph9ovqfCvYCCqwAF2yMMbIZOIOohUyej9LqWUt53ZLiTQZhLrvEyKveV0HvTi7DtKWjBDLpIDw=; AWSALB=rWGKTg29X2bU2uswFzHYu2O0ltY/t1qXMJTFXXTuOnW4LarCMOCXwNmka++EvquYqjkk0TOgRj64PcHh5NttbwZ2QshA+fNIjFYyEUnnckcgeKxHLIU+hLAqhLTT; AWSALBCORS=rWGKTg29X2bU2uswFzHYu2O0ltY/t1qXMJTFXXTuOnW4LarCMOCXwNmka++EvquYqjkk0TOgRj64PcHh5NttbwZ2QshA+fNIjFYyEUnnckcgeKxHLIU+hLAqhLTT",
    //     Referer: "https://one.kpu.ca/?login=true",
    //     "Referrer-Policy": "strict-origin-when-cross-origin",
    //   },
    //   body: null,
    //   method: "GET",
    // });
  },
};

export default kpuApi;
