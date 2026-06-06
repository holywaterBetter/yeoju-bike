import { VisualPage } from "@/components/visual-page/VisualPage";
import { figmaPages } from "@/data/figmaPages";

export default function Home() {
  return <VisualPage page={figmaPages.landing} active="landing" />;
}
