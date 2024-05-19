"use client";

import { useEffect, useLayoutEffect } from "react";
import agentStore from "./Store/UserStore";
import Dashboard from "./components/Dashboard/Dashboard";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";

export default function Home() {
  const agent = agentStore((state) => state.agent);

  useEffect(() => {
    if (agent === null) {
      redirect("/login");
    }
  }, [agent]);

  return (
    <main>
      <Navbar />
      <Dashboard agent={agent} />
    </main>
  );
}
