import { ArchitectureView } from "@/components/ArchitectureView";
import { Navbar } from "@/components/Navbar";

export default function Architecture() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-background">
      <Navbar />
      <ArchitectureView />
    </div>
  );
}
