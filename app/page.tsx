import MainBlog from "@/app/ui/components/blog/main-blog/MainBlog";
import AppLayout from "./ui/components/layout/AppLayout";

export default function Home() {
  return (
    <AppLayout>
      <main style={{
        padding: 0,
        margin: 0,
      }}>
        <MainBlog />
      </main>
    </AppLayout>
  );
}
