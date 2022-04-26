import Container from "./container";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <nav className="py-10 flex flex-wrap justify-center">
          <span className="text-xl tracking-tight leading-tight">
            {"© " + new Date().getFullYear() + " all rights reserved | "}
          </span>
          <span className="text-xl mx-2 leading-tight">
            <Link href="/impressum">
              <a className="hover:underline">impressum</a>
            </Link></span>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
