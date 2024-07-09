import { Service } from "./types";

const defaultDescription =
  "Provides a wide range of resources and services to support various needs.";
const defaultImage = "/service-images/kpu.png";

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
      "Access to books, articles, journals and other library services.",
    image: "/service-images/library.png",
  },
  6832: {
    title: "Employee Email",
    description:
      "Employee’s personal email to communicate with students and faculty.",
    image: "/service-images/employee-email.png",
  },
  6834: {
    description:
      "Your personal email to communicate and collaborate between students and faculty.",
    image: "/service-images/student-email.png",
  },
  6624: {
    description:
      "MAP is a tool for students to track completion of program requirements and map their route to graduation.",
    image: "/service-images/my-action-plan.png",
  },
  6961: {
    image: "/service-images/employee-dashboard.png",
  },
  6953: {
    description:
      "Manage your course registration, check registration history, and plan your future courses.",
    image: "/service-images/register.png",
  },
  6098: {
    image: "/service-images/maintenance.png",
  },
  6962: {
    description:
      "Efficiently manage your academic and administrative needs with Banner 9.",
    image: "/service-images/banner-navigator.png",
  },
  6952: {
    description:
      "Platform where students can register for classes, pay tuition fees, update personal information, check or post grades, etc.",
    image: "/service-images/self-service.png",
  },
  6298: {
    description:
      "Provides access to U-pass BC, campus-to-campus shuttle program, discounted fitness center passes, car sharing program, bicycle lockers",
    image: "/service-images/upass.png",
  },
  6749: {
    image: "/service-images/papercut.png",
  },
  6681: {
    description:
      "OneDrive is a cloud-based storage for Employees and Students.",
    image: "/service-images/onedrive.png",
  },
  6754: {
    image: "/service-images/taleo.png",
  },
  6954: {
    description:
      "Access to student’s personal information, academic history and standing, credits, GPA, and registration notices.",
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
    description:
      "Provides information how, where, and for what price you can print.",
    image: "/service-images/printing.png",
  },
  6277: {
    image: "/service-images/compass.png",
  },
  5649: {
    image: "/service-images/fees-and-costs.png",
  },
  6259: {
    description:
      "Easily book study rooms for a focused and quiet study environment.",
    image: "/service-images/book-room.png",
  },
  6296: {
    description:
      "Check key academic dates, including registration, exams, and holidays.",
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
    description: "Here you can pay your tuition and outstanding fees.",
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
  // new services
  5744: {
    image: "/service-images/library-services.png",
  },
  6104: {
    image: "/service-images/research.png",
  },
  6105: {
    image: "/service-images/research.png",
  },
  6106: {
    image: "/service-images/research.png",
  },
  6072: {
    image: "/service-images/research.png",
  },
  5743: {
    image: "/service-images/hours.png",
  },
  6206: {
    image: "/service-images/plagiarism.png",
  },
  6529: {
    image: "/service-images/shuttle.png",
  },
  6710: {
    image: "/service-images/id-card.png",
  },
  6843: {
    image: "/service-images/big-blue-button.png",
  },
  6951: {
    description:
      "Easily access your grades and monitor your academic performance.",
    image: "/service-images/check-grades.png",
  },
  6157: {
    image: "/service-images/science-and-horticulture.png",
  },
  6655: {
    image: "/service-images/marketing.png",
  },
  6858: {
    image: "/service-images/virtual-internships.png",
  },
  6945: {
    description:
      "Accessed by students to submit their Social Insurance Number (SIN)",
    image: "/service-images/submit-sin.png",
  },
  6663: {
    image: "/service-images/advising.png",
  },
  6267: {
    image: "/service-images/advising.png",
  },
  6268: {
    image: "/service-images/advising.png",
  },
  6229: {
    image: "/service-images/advising.png",
  },
  6842: {
    image: "/service-images/advising.png",
  },
  6346: {
    image: "/service-images/study-abroad.png",
  },
  6623: {
    image: "/service-images/maps.png",
  },
  6654: {
    image: "/service-images/marketing-resources.png",
  },
  6756: {
    description:
      "Find more about KPU's Temporary Medical Insurance Plan, KSA Extended Health, Dental and BC Medical Services Plan (BCMSP).",
    image: "/service-images/insurance.png",
  },
  5618: {
    image: "/service-images/university-calendar.png",
  },
  6208: {
    title: "Art Programs",
    image: "/service-images/arts.png",
  },
  6570: {
    image: "/service-images/my-ssp.png",
  },
  6740: {
    description:
      "Provides details of process for ordering official transcripts from KPU, including requirements, delivery options, costs, and processing times.",
    image: "/service-images/transcript.png",
  },
  6745: {
    image: "/service-images/transcript.png",
  },
  6550: {
    image: "/service-images/transcript.png",
  },
  5648: {
    image: "/service-images/transfer.png",
  },
  6950: {
    image: "/service-images/view-transcript.png",
  },
  5715: {
    description:
      "Get help with admissions, registration, records, and graduation.",
    image: "/service-images/office.png",
  },
  5553: {
    image: "/service-images/directory-search.png",
  },
  6959: {
    image: "/service-images/payroll.png",
  },
  6747: {
    image: "/service-images/payroll.png",
  },
  6233: {
    image: "/service-images/tech.png",
  },
  6236: {
    image: "/service-images/tech.png",
  },
  6232: {
    image: "/service-images/tech.png",
  },
  6720: {
    title: "Courses Website - Community",
    image: "/service-images/moodle-community.png",
  },
  6684: {
    title: "Courses Website (Old)",
    image: "/service-images/moodle-community.png",
  },
  6598: {
    description:
      "Enhance your educational experience with PebblePad. This versatile platform provides a range of resources to support your academic journey, allowing you to create, share, and reflect on your work.",
    image: "/service-images/pebblepad.png",
  },
  6162: {
    description:
      "Explore innovative design programs and resources at the Wilson School of Design.",
    image: "/service-images/wilson.png",
  },
  6495: {
    image: "/service-images/instagram.png",
  },
  6496: {
    title: "KPU X",
    image: "/service-images/x.png",
  },
  6494: {
    image: "/service-images/facebook.png",
  },
  6238: {
    image: "/service-images/feedback.png",
  },
  6289: {
    image: "/service-images/kwantlen-faculty-association.png",
  },
  6129: {
    image: "/service-images/submit-key.png",
  },
  6591: {
    image: "/service-images/kaltura.png",
  },
  6531: {
    image: "/service-images/coop.png",
  },
  6347: {
    image: "/service-images/study-abroad.png",
  },
  6368: {
    image: "/service-images/accessibility.png",
  },
  6791: {
    image: "/service-images/self-service.png",
  },
  6944: {
    image: "/service-images/creative-cloud.png",
  },
  5647: {
    image: "/service-images/transfer.png",
  },
  6947: {
    image: "/service-images/payroll.png",
  },
  6651: {
    image: "/service-images/employee.png",
  },
  6949: {
    image: "/service-images/self-service.png",
  },
  6956: {
    image: "/service-images/self-service.png",
  },
  6770: {
    image: "/service-images/student-password.png",
  },
  6769: {
    image: "/service-images/student-password.png",
  },
  6771: {
    image: "/service-images/student-password.png",
  },
  6707: {
    image: "/service-images/employee-password.png",
  },
  6692: {
    image: "/service-images/employee-password.png",
  },
  6691: {
    image: "/service-images/employee-password.png",
  },
  5645: {
    image: "/service-images/transfer.png",
  },
  6214: {
    image: "/service-images/employee.png",
  },
  6652: {
    image: "/service-images/kpu.png",
  },
  6388: {
    image: "/service-images/kpu.png",
  },
  6181: {
    image: "/service-images/kpu.png",
  },
  6209: {
    image: "/service-images/kpu.png",
  },
  6187: {
    image: "/service-images/kpu.png",
  },
  6465: {
    image: "/service-images/kpu.png",
  },
  6801: {
    image: "/service-images/kpu.png",
  },
  6721: {
    image: "/service-images/moodle-community.png",
  },
  5285: {
    image: "/service-images/hours.png",
  },
  6348: {
    image: "/service-images/fees-and-costs.png",
  },
  5598: {
    image: "/service-images/hours.png",
  },
  6848: {
    image: "/service-images/course-feedback.png",
  },
  6869: {
    image: "/service-images/cim.png",
  },
  6868: {
    image: "/service-images/cim.png",
  },
  6870: {
    image: "/service-images/cim.png",
  },
  6867: {
    image: "/service-images/cim.png",
  },
  6566: {
    image: "/service-images/pay.png",
  },
  5469: {
    image: "/service-images/admission.png",
  },
  5443: {
    image: "/service-images/convocation.png",
  },
  6599: {
    image: "/service-images/kaltura-video.png",
  },
  6290: {
    image: "/service-images/bcgeu.png",
  },
};

export function refineService(service: Omit<Service, "description">): Service {
  const refinedService = refinedServices[service.id];
  if (refinedService)
    return { ...service, description: defaultDescription, ...refinedService };
  return {
    ...service,
    image: defaultImage,
    description: defaultDescription,
  };
}
