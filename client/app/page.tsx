import NonDashboardNavbar from "@/components/nondashboard-navbar";
import Landing from "./(nondashboard)/landing/page";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="nondashboard-layout">
      <NonDashboardNavbar />
      <main className="nondashboard-layout__main">
        <Landing />
      </main>
      <Footer />
    </div>
  );
}
