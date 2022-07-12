import React from "react";
import DashboardScreen from "../components/dashboard";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user.admin) {
    router.push("/student");
    return <>Redirecting...</>;
  }

  return (
    <>
      <DashboardScreen />
    </>
  );
};

export default Home;
