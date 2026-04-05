import Header from "@/components/Header";
import LandingPage from "@/components/LandingPage";
import ProfileWizard from "@/components/ProfileWizard";
import ResultsPage from "@/components/ResultsPage";
import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import type { UserSelections } from "./types";

export type AppPage = "landing" | "wizard" | "results";

export default function App() {
  const [page, setPage] = useState<AppPage>("landing");
  const [selections, setSelections] = useState<UserSelections | null>(null);

  const handleStartWizard = () => setPage("wizard");

  const handleWizardComplete = (data: UserSelections) => {
    setSelections(data);
    setPage("results");
  };

  const handleStartOver = () => {
    setSelections(null);
    setPage("landing");
  };

  const handleEditProfile = () => {
    setPage("wizard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        page={page}
        onNavigate={setPage}
        onStartWizard={handleStartWizard}
      />
      <main>
        {page === "landing" && <LandingPage onStart={handleStartWizard} />}
        {page === "wizard" && (
          <ProfileWizard
            initialSelections={selections}
            onComplete={handleWizardComplete}
            onBack={() => setPage("landing")}
          />
        )}
        {page === "results" && selections && (
          <ResultsPage
            selections={selections}
            onStartOver={handleStartOver}
            onEditProfile={handleEditProfile}
          />
        )}
      </main>
      <Toaster />
    </div>
  );
}
