import Image from "next/image";
import Login from "./ui/Login";

export default function Home() {
  return (
    <section className="flex justify-center items-center h-screen bg-[url(https://qualfind.com/wp-content/uploads/2019/03/cropped-black-chrome-gradient-ui-gradient-background.jpg)] bg-no-repeat bg-cover">
      <main>
        <Login/>
      </main>
    </section>
  );
}
