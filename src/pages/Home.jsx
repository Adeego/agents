import agentStore from "@/Store/AgentStore";
import Dashboard from "@/components/comps/Dashboard";
import Navbar from "@/components/comps/Navbar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { agent } = agentStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (agent == null) {
      navigate("/login");
    }
  }, []);
  return (
    <main>
      <Navbar />
      <Dashboard />
    </main>
  );
};

export default Home;
