import { FaBusinessTime } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import { MdDesignServices } from "react-icons/md";
import { MdOutlineCampaign } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { GiHealthNormal } from "react-icons/gi";

const categoryItems = [
  {
    id: 1,
    title: "Business",
    link: "#",
    icon: <FaBusinessTime />,
    delay: 0.2,
    // description: "Explore courses and resources to boost your business skills and entrepreneurship.",
  },
  {
    id: 2,
    title: "Technology",
    link: "#",
    icon: <MdOutlineComputer />,
    delay: 0.2,
    // description: "Stay ahead with the latest in software, hardware, and tech innovations.",
  },
  {
    id: 3,
    title: "Design",
    link: "#",
    icon: <MdDesignServices />,
    delay: 0.2,
    // description: "Learn the principles of UI/UX, graphic design, and creative tools.",
  },
  {
    id: 4,
    title: "Marketing",
    link: "#",
    icon: <MdOutlineCampaign />,
    delay: 0.2,
    // description: "Master digital marketing, branding, SEO, and social media strategies.",
  },
  {
    id: 5,
    title: "Finance",
    link: "#",
    icon: <MdAttachMoney />,
    delay: 0.2,
    // description: "Gain knowledge on personal finance, investing, and accounting.",
  },
  {
    id: 6,
    title: "Health & Wellness",
    link: "#",
    icon: <GiHealthNormal />,
    delay: 0.2,
    // description: "Improve your well-being with courses on fitness, nutrition, and mental health.",
  },
];

export default categoryItems;
