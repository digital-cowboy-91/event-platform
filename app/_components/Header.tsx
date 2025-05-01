import { Flex } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Sidebar from "./sidebar/Sidebar";

export default function Header() {
  return (
    <header>
      <Flex justify={"between"} p="3">
        <Link href="/" className="font-bold text-xl">
          <Image
            src="/media/assets/logo-syt-horizontal.png"
            alt="Logo of See You There website"
            width={100}
            height={100}
          />
        </Link>
        <Suspense>
          <Sidebar />
        </Suspense>
      </Flex>
    </header>
  );
}
