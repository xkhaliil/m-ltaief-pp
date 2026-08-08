import { Amiri } from "next/font/google";

const amiri = Amiri({ subsets: ["arabic"], weight: ["700"], display: "swap" });

export function SiteLoader() {
  return (
    <div className="site-loader">
      <div className={`site-loader-name ${amiri.className}`} dir="rtl" lang="ar">
        مُحَمَّد عَلِيّ لَطْيَف
      </div>
      <div className="site-loader-status">
        Loading
        <span className="site-loader-dot">.</span>
        <span className="site-loader-dot">.</span>
        <span className="site-loader-dot">.</span>
      </div>
    </div>
  );
}
