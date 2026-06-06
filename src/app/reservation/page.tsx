import { VisualPage } from "@/components/visual-page/VisualPage";
import { figmaPages } from "@/data/figmaPages";

export default function Reservation() {
  return <VisualPage page={figmaPages.reservation} active="reservation" />;
}
