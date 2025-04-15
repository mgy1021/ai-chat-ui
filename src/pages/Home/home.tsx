import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./index.css";

export default function Home() {
  return (
    <>
      <Layout>
        <Sidebar />
        <Main />
      </Layout>
    </>
  );
}

function Main() {
  return (
    <>
      <div className="bg-light-gray flex-auto flex flex-col">
        <Header></Header>
        <div className=" flex-1 overflow-auto flex justify-center items-center">
          <div className=" max-w-[802px] w-[802px]">
            <Hello></Hello>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
}

function Header() {
  return (
    <>
      <div className=" h-16 "></div>
    </>
  );
}

function Footer() {
  return (
    <>
      <div className=" h-40">
        <div className=" flex justify-center">
          <div></div>
          <InputSender />
        </div>
      </div>
    </>
  );
}

function InputSender() {
  return (
    <>
      <div className=" max-w-[802px] w-[802px] shadow border border-dark-gray border-solid rounded-xl">
        <div className="p-3 ">
          <div className="">
            <input type="text" />
          </div>
          <div>btn</div>
        </div>
      </div>
    </>
  );
}

function Hello() {
  return (
    <>
      <div className="flex flex-col justify-center items-start h-full w-full">
        <div>
          <div className="text-[32px] leading-9 font-medium"> Hi~ 我是元宝</div>
          <div className=" text-base text-black/60 mt-2">
            你身边的智能助手，可以为你答疑解惑、尽情创作，快来点击以下任一功能体验吧～
          </div>
          <div className=" divide-blue-700 divide-b-1"></div>
          <div className=" flex flex-col items-start justify-center">
            <div className=" text-xs font-normal mt-4 mb-2 text-black/40 inline-block">
              你可以这样问
            </div>
            <div className=" text-sm px-3 py-2 bg-gray  hover:bg-dark-gray mt-2 cursor-pointer rounded-lg text-black/90">
              人类如果不需要睡觉，会进化出什么新器官？
            </div>
            <div className="text-sm px-3 py-2 bg-gray hover:bg-dark-gray mt-2 cursor-pointer rounded-lg text-black/90 ">
              人类是怎样对一个人产生爱恨的？爱一个人需要理由吗？
            </div>
            <div className=" text-sm px-3 py-2 bg-gray hover:bg-dark-gray mt-2 cursor-pointer rounded-lg text-black/90">
              为什么切洋葱流泪是化学攻击，植物在报复人类吗？
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
