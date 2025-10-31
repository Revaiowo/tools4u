import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className="flex flex-col gap-2 px-2" id="home">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
