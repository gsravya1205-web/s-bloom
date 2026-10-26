import React, { useEffect } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLocation,
} from "react-router";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { BloomTransition } from "./components/common/BloomTransition";
import "./index.css";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // When redirecting or navigating to any page, always start from the top
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ScrollToTop />
        <BloomTransition />
        <div className="app-layout">
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
