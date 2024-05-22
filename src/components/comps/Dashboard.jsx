"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coins, Percent, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";

import {
  getFirestore,
  onSnapshot,
  query,
  collection,
} from "firebase/firestore";
import app from "../../../firebaseConfig";
import agentStore from "@/Store/AgentStore";
import { formatPrice } from "@/lib/utils";

const Dashboard = () => {
  const { agent } = agentStore();

  const { Code } = agent;
  console.log(Code);

  const [clients, setClients] = useState([]);
  const [orders, setOrders] = useState([]);
  const [totalRevenue, SetTotalRevenue] = useState(0);
  const [orderAverage, SetOrderAverage] = useState(0);

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const clientRef = collection(db, "User");

        const q = query(clientRef); // change user to agents.

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          const filteredUsers = users.filter(
            (u) => u.ReferredBy !== null && u.ReferredBy == agent.Code
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

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const orderRef = collection(db, "Orders");

        const q = query(orderRef); // change user to agents.

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          const filteredOrders = orders.filter(
            (o) => o.UserId === clients.map((c) => c.id)
          );
          const amounts = filteredOrders.map((a) => a.TotalAmount);

          const totalAmountSpent =
            filteredOrders.length > 0 ? amounts.reduce((a, b) => a + b) : 0;
          const revenue = totalAmountSpent * 0.018;
          const orderAvg = totalAmountSpent / orders.length;

          SetOrderAverage(orderAvg);
          SetTotalRevenue(revenue);
          setOrders(filteredOrders);
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
            <div className="text-2xl font-bold">
              {formatPrice(totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground">0% from last month</p>
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
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Percent size={16} className="" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground">0% from last month</p>
          </CardContent>
        </Card>
        <Card className="rounded-[0.3rem] h-36">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders Average
            </CardTitle>
            <Coins size={16} className="" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPrice(orderAverage)}
            </div>
            <p className="text-xs text-muted-foreground">0% from last month</p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;

// !0725970724
// !adeego.ltd@gmail.com
