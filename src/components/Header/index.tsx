import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SignInButton } from "../SignInButton";

import logoSvg from "../../../public/images/logo.svg";

import styles from "./styles.module.scss";

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoSvg} alt="ignews seu blog de tecnologia" />
        <nav>
          <Link href="/">
            <a className={asPath === "/" ? styles.active : ""}>Home</a>
          </Link>
          <Link href="/posts">
            <a className={asPath === "/posts" ? styles.active : ""}>Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
