import { ContentStructure, Notification } from "@/lib/kpu-api/types";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import NotificationContentRenderer from "./notification-content-renderer";
import { useState } from "react";

interface NotificationCardProps {
  title: string;
  content: ContentStructure;
}

function NotificationCard({ title, content }: NotificationCardProps) {
  const [isShowMore, setIsShowMore] = useState(false);
  return (
    <div className="m-2 w-fit gap-4 rounded-xl p-2 hover:bg-[#F9F9F9]">
      <h5 className="text-nowrap font-medium leading-none">{title}</h5>
      <div className="mt-2">
        <NotificationContentRenderer content={content} showMore={isShowMore} />
      </div>
      <button
        className="dark:ring-offset-dark-background text-sm text-primary hover:text-primary/80 focus:outline-none"
        onClick={() => setIsShowMore(!isShowMore)}
      >
        {isShowMore ? "Show less" : "Show more"}
      </button>
    </div>
  );
}

interface NotificationsPopoverProps {
  notifications?: Notification[];
}

export default function NotificationsPopover({
  notifications,
}: NotificationsPopoverProps) {
  const showDot = (notifications?.length ?? 0) > 0;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          {showDot ? (
            <Icons.bellDot className="h-6 w-6" />
          ) : (
            <Icons.bell className="h-6 w-6" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative right-20 w-fit max-w-md">
        <div className="">
          <div className="">
            <div className="p-4">
              <h4 className="text-lg font-medium leading-none">
                Notifications
              </h4>
            </div>
            <div className="h-px w-full bg-slate-100"></div>
            <div className="max-h-[80vh] overflow-y-auto">
              <div className="my-2">
                {notifications &&
                  notifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      title={notification.title}
                      content={notification.content}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
