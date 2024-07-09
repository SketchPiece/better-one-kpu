import { z } from "zod";
import { Service, UpdateFavorite, UserProfile, Notification } from "./types";
import { refineService } from "./refine-service";
import { CategoryValue } from "../categories";
import Cookies from "js-cookie";
import { parseHtmlString } from "../utils";

const commonOptions = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const tileSchema = z.object({
  title: z.string(),
  uniqueKey: z.string(),
  favorite: z.boolean(),
  task: z.object({
    taskId: z.number(),
    uid: z.string(),
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

const notificationSchema = z.object({
  announcementId: z.number(),
  title: z.string(),
  description: z.string(),
});

type UserProfileData = z.infer<typeof userProfileDataSchema>;

function mapUserProfile(userData: UserProfileData): UserProfile {
  return {
    userId: userData.user.userId,
    email: userData.user.email,
    username: userData.user.userName,
    initials: userData.user.userInitials,
    greetingName: userData.user.greetingName,
  };
}

function mapTileToService(rawTile: unknown) {
  const parseResult = tileSchema.safeParse(rawTile);
  if (!parseResult.success) return null;
  const tile = parseResult.data;
  return refineService({
    id: tile.task.taskId,
    uid: tile.task.uid,
    title: tile.title,
    image: tile.task.tabletHighResolutionImageCdnUrl,
    uniqueKey: tile.uniqueKey,
    favorite: tile.favorite,
  });
}

function mapNotification(rawNotification: unknown) {
  const parseResult = notificationSchema.safeParse(rawNotification);
  if (!parseResult.success) return null;
  const notification = parseResult.data;
  return {
    id: notification.announcementId,
    title: notification.title,
    description: notification.description,
    content: parseHtmlString(notification.description),
  };
}

interface ServicesQueryParams {
  pageNumber?: number;
  searchQuery?: string;
  category?: CategoryValue | null;
  roles?: string[];
}

function defineUniqueKey(
  category?: CategoryValue | null,
  searchQuery?: string,
) {
  if (category) return category;
  if (searchQuery) return "_search_";
  return "_popular_";
}

// const mockNotification: any = {
//   announcementId: 1481,
//   title: "Under Maintenance: Banner",
//   description:
//     "<p>Banner is currently undergoing maintenance from Friday, June 14 at 8:00 PM to Sunday, June 16 at 12:00 PM.</p>\n<p>The following services are not currently available</p>\n<ul>\n<li>Admin Pages (Banner 9)</li>\n<li>Banner 9 apps (Student Registration Self-Service, Student Profile, Faculty Self-Service, Employee Dashboard, BDM, Communication Management)</li>\n<li>Online Self-Service (OSS.KPU.CA)</li>\n<li>FAST (Finance, HR, WebReq, PCARD, Budget, Student, etc)</li>\n<li>Integration to and from Banner (Elevate, EPBC, Degree Works, AdAstra, Moodle, etc.)</li>\n<li>Other Online Self-Services (Adobe Creative Cloud Consent, Submit SIN, View Personalized Booklist, KPU Card Request)</li>\n</ul>",
//   subType: "TEXT",
//   containerType: "SIDEBAR",
//   dismissible: true,
//   url: null,
//   openInNewWindow: false,
//   imageUrl: null,
//   imageCaption: null,
//   disableTaskLaunch: "NO",
//   cmAnnouncement: false,
//   canEdit: false,
//   titleBarColorIndex: 0,
// };

const kpuApi = {
  getAllServices: async ({
    pageNumber = 0,
    searchQuery,
    category,
    roles,
  }: ServicesQueryParams) => {
    const uniqueKey = defineUniqueKey(category, searchQuery);
    const collectionOptions = category
      ? { categoryUniqueKey: uniqueKey }
      : { taskCollectionUniqueKey: uniqueKey };

    const rawCollectionData = await fetch(`/tasks`, {
      method: "POST",
      body: JSON.stringify({
        pageNumber,
        mobile: false,
        mobileOnly: false,
        terms: searchQuery,
        roleUniqueKeys: roles?.map((role) =>
          role === "employee" ? "kpuemployee" : role,
        ),
        ...collectionOptions,
      }),
      ...commonOptions,
    }).then((res) => res.json());

    const rawCollection = rawCollectionData.taskCollections.find(
      (item: { uniqueKey: string }) => item.uniqueKey === uniqueKey,
    );

    const rawTiles = rawCollection?.tiles;

    const services: Service[] = rawTiles?.map(mapTileToService);

    return {
      data: services,
      hasNextPage: rawCollection.hasMore,
      page: pageNumber,
    };
  },
  getQuickServices: async ({ roles }: { roles?: string[] } = {}) => {
    const rawCollectionData = await fetch(`/tasks`, {
      method: "POST",
      body: JSON.stringify({
        pageNumber: 0,
        mobile: false,
        mobileOnly: false,
        roleUniqueKeys: roles?.map((role) =>
          role === "employee" ? "kpuemployee" : role,
        ),
      }),
      ...commonOptions,
    }).then((res) => res.json());

    const rawFeaturedTiles = rawCollectionData.taskCollections.find(
      (item: { uniqueKey: string }) => item.uniqueKey === "_featured_",
    )?.tiles;
    const rawFavoritesTiles = rawCollectionData.taskCollections.find(
      (item: { uniqueKey: string }) => item.uniqueKey === "_favorite_",
    )?.tiles;
    const rawRecentTiles = rawCollectionData.taskCollections.find(
      (item: { uniqueKey: string }) => item.uniqueKey === "_recentlyUsed_",
    )?.tiles;

    const featuredServices: Service[] = rawFeaturedTiles?.map(mapTileToService);

    const favoriteServices: Service[] =
      rawFavoritesTiles?.map(mapTileToService);

    const recentServices: Service[] = rawRecentTiles?.map(mapTileToService);

    return {
      essentials: featuredServices,
      favorites: favoriteServices,
      recents: recentServices,
    };
  },
  getUserProfile: async (): Promise<UserProfile | null> => {
    const rawProfileData = await fetch("/res/settings?module=store", {
      method: "GET",
      ...commonOptions,
    }).then((res) => res.json());
    const parsedUserProfile = userProfileDataSchema.safeParse(rawProfileData);
    if (!parsedUserProfile.success) return null;
    const userProfile = mapUserProfile(parsedUserProfile.data);
    return userProfile;
  },
  updateFavorite: async ({ uid, favorite }: UpdateFavorite) => {
    await fetch("https://one.kpu.ca/favorite", {
      method: "POST",
      body: JSON.stringify({
        status: favorite,
        taskUid: uid,
      }),
      headers: {
        ...commonOptions.headers,
        "x-xsrf-token": Cookies.get("XSRF-TOKEN") || "",
      },
    });
  },
  getNotifications: async () => {
    const rawNotificationsData = await fetch(
      "https://one.kpu.ca/announcement/list?dismissed=false",
      {
        method: "GET",
        ...commonOptions,
      },
    ).then((res) => res.json());

    const notifications: Notification[] = rawNotificationsData
      .map(mapNotification)
      .filter((notification: unknown) => notification !== null);

    return notifications;
  },
};

export default kpuApi;
