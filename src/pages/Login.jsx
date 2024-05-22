import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { CircleCheck } from "lucide-react";
import { toast } from "sonner";
import agentStore from "../Store/AgentStore";
import app from "../../firebaseConfig";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAgent } = agentStore();

  const verifyAgent = async () => {
    try {
      // Check if user exists in the database
      const db = getFirestore(app);
      const userRef = collection(db, "Agents");
      const userQuery = query(userRef, where("Phone", "==", phone));
      const querySnapshot = await getDocs(userQuery);
      // Check if any documents match the query
      if (querySnapshot.empty) {
        alert(`${phone} does not exist! Sign up`);
      } else {
        const pass = querySnapshot.docs[0].data().Password;
        if (pass != password) {
          alert("Invalid password");
        } else {
          const userData = querySnapshot.docs[0].data();

          const user = {
            FullName: userData.FullName,
            Phone: userData.Phone,
            Code: userData.Code,
            Wallet: userData.Wallet,
            Address: userData.Address,
            Occupation: userData.Occupation,
            Id: userData.id,
          };
          console.log(user);
          setAgent(user);

          toast(
            <div className="p-3 bg-white border border-neutral-300 rounded-[0.4rem] flex items-center gap-2 w-full">
              <CircleCheck
                size={16}
                className="stroke-neutral-600 md:text-sm text-neutral-800"
              />
              Login successful.
            </div>
          );

          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="w-full pt-40 md:h-screen md:pt-0 flex items-center justify-center">
      <Card className="w-full max-w-sm card">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your credentials below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Phone</Label>
            <Input
              id="number"
              type="text"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
              placeholder="Password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <button
            onClick={(e) => {
              e.stopPropagation();
              verifyAgent();
            }}
            className="w-full bg-[#2a2a2a] rounded-[0.4rem] text-white hover:bg-black p-2"
          >
            Sign in
          </button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Login;

