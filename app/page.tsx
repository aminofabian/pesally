import CoinPrice from "@/components/CoinPrice";
import Footer from "@/components/Footer";
import LeaveReview from "@/components/LeaveReview";
import OrderDisplay from "@/components/OrderDisplay";
import Reviews from "@/components/Reviews";
import Transactions from "@/components/Transactions";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-3 mx-auto flex-shrink overflow-x-auto w-full">
      <OrderDisplay />
      <CoinPrice />
      <LeaveReview />
      <Reviews />
      <Transactions />
      

    </div>
  );
}
