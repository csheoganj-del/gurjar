import { preload } from "react-dom";
import { HomeExperience } from "@/components/home-experience";

export default function Home() {
  preload("/world/table-composed.jpg", { as: "image" });
  preload("/world/table-desktop.jpg", { as: "image" });
  preload("/world/table-mobile.jpg", { as: "image" });
  return <HomeExperience />;
}
