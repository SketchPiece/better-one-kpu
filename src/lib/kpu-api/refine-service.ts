import { Service } from "./types";

const refinedServices: Record<number, Partial<Service>> = {
  6850: {
    title: "Courses Website",
    description:
      "Moodle is a learning management platform for instructors and students to communicate, collaborate, and access resources/activities to deliver course content.",
  },
};

const defaultDescription =
  "Provides a wide range of resources and services to support various needs. Offers access to diverse materials and tools, catering to research, study, and other requirements.";

export function refineService(service: Omit<Service, "description">): Service {
  const refinedService = refinedServices[service.id];
  if (refinedService)
    return { ...service, description: defaultDescription, ...refinedService };
  return {
    ...service,
    description: defaultDescription,
  };
}
