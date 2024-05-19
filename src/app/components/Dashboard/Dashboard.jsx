"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Coins, Percent, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getFirestore,
  onSnapshot,
  query,
  collection,
} from "firebase/firestore";
import app from "../../../../firebaseConfig";

const Dashboard = ({ agent }) => {
  const { FullName, Phone, Code, Wallet, Address, Occupation, Id } = agent;
  const [clients, setClients] = useState([]);
  

  console.log(Code);
  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const clientRef = collection(db, "User");

        const q = query(clientRef); // change user to agents.

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const user = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const filteredUsers = user.filter(
            (u) => u.ReferredBy !== null && u.ReferredBy == Code
          );
          setClients(filteredUsers);
        });

        // No need to return unsubscribe here
      } catch (error) {}
    };

    fetchData();

    // Cleanup function to detach the listener on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);
  return (
    <main className="p-4">
      <div className="flex flex-col gap-3">
        <Card className="rounded-[0.3rem] h-36">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 4,500</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-[0.3rem] h-36">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Referred Clients
            </CardTitle>
            <UsersRound size={16} className="" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clients.length}</div>
            <p className="text-xs text-muted-foreground">0% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-[0.3rem] h-36">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Client spend
            </CardTitle>
            <Coins size={16} className="" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES 200,000</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-[0.3rem] h-36">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <Percent size={16} className="" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;
