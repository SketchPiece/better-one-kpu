import { Service } from "./types";

const defaultDescription =
  "Provides a wide range of resources and services to support various needs. Offers access to diverse materials and tools, catering to research, study, and other requirements.";

const refinedServices: Record<number, Partial<Service>> = {
  6850: {
    title: "Courses Website",
    description:
      "Moodle is a learning management platform for instructors and students to communicate, collaborate, and access resources/activities to deliver course content.",
    image: "/service-images/courses-website.png",
  },
  6556: {
    title: "Library",
    description:
      "Access to books, journals, databases, and multimedia resources. Supports research and study needs with research assistance and study spaces.",
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
