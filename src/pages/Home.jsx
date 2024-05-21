import agentStore from "@/Store/AgentStore";
import Dashboard from "@/components/comps/Dashboard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const agent = agentStore((state) => state.staff);
  const navigate = useNavigate();

  if (agent == null) {
    navigate("/");
  }
  return (
    <main>
      <Dashboard />
    </main>
  );
};

export default Home;
