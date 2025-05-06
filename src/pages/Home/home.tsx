import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Main from "../../components/Layout/Main";

export default function Home() {
  return (
    <div className="flex h-screen bg-[#f4f7fe] dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
