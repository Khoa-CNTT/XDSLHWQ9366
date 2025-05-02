import { BiSupport } from "react-icons/bi";
import { CiMobile3 } from "react-icons/ci";
import { IoMdHappy } from "react-icons/io";
import { IoPulseOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import { TbWorldWww } from "react-icons/tb";

const serviceItems = [
  {
    id: 1,
    title: "Web Development",
    link: "#",
    icon: <TbWorldWww />,
    delay: 0.2,
    // description: "We provide web development services for your business",
  },
  {
    id: 2,
    title: "Mobile Development",
    link: "#",
    icon: <CiMobile3 />,
    delay: 0.2,
    // description: "We provide web development services for your business",
  },
  {
    id: 3,
    title: "SQL",
    link: "#",
    icon: <RiComputerLine />,
    delay: 0.2,
    // description: "We provide web development services for your business",
  },
  {
    id: 4,
    title: "DevOps",
    link: "#",
    icon: <IoMdHappy />,
    delay: 0.2,
    // description: "We provide web development services for your business",
  },
  {
    id: 5,
    title: "Computer Network",
    link: "#",
    icon: <IoPulseOutline />,
    delay: 0.2,
    // description: "We provide web development services for your business",
  },
  {
    id: 6,
    title: "24/7 Support",
    link: "#",
    icon: <BiSupport />,
    delay: 0.2,
    // description: "We provide web development services for your business",
  },
];

export default serviceItems;
