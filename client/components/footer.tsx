import { footerLinks } from "@/data";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; {new Date().getFullYear()} Learnova. All rights reserved.</p>
      <div className="footer__links">
        {footerLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            scroll={false}
            className="footer__link"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
