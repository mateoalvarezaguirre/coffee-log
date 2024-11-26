import AppLayout from "./ui/components/layout/AppLayout";
import {Home as HomeComponent} from "@/app/ui/components/home/Home";

export default function Home() {
  return (
    <AppLayout>
      <main style={{
        padding: 0,
        margin: 0,
      }}>
        <HomeComponent />
      </main>
    </AppLayout>
  );
}
