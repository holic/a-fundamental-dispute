import Link from "next/link";

import { TextLink } from "./TextLink";

export const TopBar = () => (
  <Link href="/">
    <a className="block px-4 py-2 fixed text-stone-500 bg-stone-900 transition hover:bg-stone-800 hover:text-white">
      ⌂
    </a>
  </Link>

  // <div className="py-2 px-8 sm:px-12 md:px-16 lg:px-20 max-w-4xl">
  //   <h1 className="text-lg font-bold text-white/20">A Fundamental Dispute</h1>
  // </div>

  // <>
  //   <div className="py-4 fixed inset-x-0 text-center">
  //     <TextLink href="/" className="opacity-40 hover:opacity-100">
  //       A Fundamental Dispute
  //     </TextLink>
  //   </div>
  //   <div className="py-4"></div>
  // </>
);
