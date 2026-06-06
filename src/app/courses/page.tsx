import { VisualPage } from "@/components/visual-page/VisualPage";
import { figmaPages } from "@/data/figmaPages";

export default function Courses() {
  return <VisualPage page={figmaPages.courses} active="courses" />;
}
