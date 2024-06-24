import { Service } from "./types";

const defaultDescription =
  "Provides a wide range of resources and services to support various needs.";

const refinedServices: Record<number, Partial<Service>> = {
  6850: {
    title: "Courses Website",
    description:
      "Moodle is a learning management platform for instructors and students.",
    image: "/service-images/courses-website.png",
  },
  6556: {
    title: "Library",
    description:
      "Access to books, articles, databases, and multimedia resources.",
    image: "/service-images/library.png",
  },
  6832: {
    title: "Employee Email",
    description: defaultDescription,
    image: "/service-images/employee-email.png",
  },
  6834: {
    image: "/service-images/student-email.png",
  },
  6624: {
    image: "/service-images/my-action-plan.png",
  },
  6961: {
    image: "/service-images/employee-dashboard.png",
  },
  6953: {
    image: "/service-images/register.png",
  },
  6098: {
    image: "/service-images/maintenance.png",
  },
  6962: {
    image: "/service-images/banner-navigator.png",
  },
  6952: {
    image: "/service-images/self-service.png",
  },
  6298: {
    image: "/service-images/upass.png",
  },
  6749: {
    image: "/service-images/papercut.png",
  },
  6681: {
    image: "/service-images/onedrive.png",
  },
  6754: {
    image: "/service-images/taleo.png",
  },
  6954: {
    image: "/service-images/student-profile.png",
  },
  5521: {
    image: "/service-images/aid.png",
  },
  5688: {
    image: "/service-images/kpq.png",
  },
  6528: {
    image: "/service-images/rights.png",
  },
  6305: {
    image: "/service-images/printing.png",
  },
  6277: {
    image: "/service-images/compass.png",
  },
  5649: {
    image: "/service-images/fees-and-costs.png",
  },
  6259: {
    image: "/service-images/book-room.png",
  },
  6296: {
    image: "/service-images/deadlines.png",
  },
  6141: {
    image: "/service-images/schedule.png",
  },
  6838: {
    image: "/service-images/it-support.png",
  },
  5593: {
    image: "/service-images/social-media.png",
  },
  6473: {
    image: "/service-images/food.png",
  },
  6948: {
    image: "/service-images/pay.png",
  },
  6628: {
    image: "/service-images/banner-navigator.png",
  },
  6955: {
    image: "/service-images/advisor-student-profile.png",
  },
  6963: {
    title: "Sign in to FAST",
    image: "/service-images/fast.png",
  },
  6857: {
    image: "/service-images/study-abroad.png",
  },
  6665: {
    image: "/service-images/zoom.png",
  },
  6555: {
    image: "/service-images/library-account.png",
  },
};

export function refineService(service: Omit<Service, "description">): Service {
  const refinedService = refinedServices[service.id];
  if (refinedService)
    return { ...service, description: defaultDescription, ...refinedService };
  return {
    ...service,
    description: defaultDescription,
  };
}
