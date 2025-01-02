import { Spinner } from "@chakra-ui/react";
import React from "react";
import { HiEye } from "react-icons/hi";

import pumpkin from "src/assets/img/admin/pumpkin.svg";
import { useAdminTotalsales } from "src/features/admin/useAdminTotalSales";
import { useTokenSaleSummary } from "src/features/investor/useTokenSaleSummary";
import { useSolPrice } from "src/features/sol/useSolPrice";

const AdminAnalyticsComponent = () => {
  const { isLoading: isLoadingSol, solprice } = useSolPrice();
  const { isLoading, admintotalsales } = useAdminTotalsales();
  const { isLoading: isLoadingSaleSummary, tokensalesummary } =
    useTokenSaleSummary();

  return (
    <div className="grid lg:grid-cols-5 lg:space-x-6 space-y-8 lg:space-y-0 py-2">
      {/*left box */}
      <div className="col-span-2 bg-primary rounded-2xl md:h-auto  p-6 flex flex-col justify-between gap-y-6">
        <div className="flex items-center gap-x-4 ">
          <div className="bg-light_grey rounded-full w-16 md:w-24 h-16 md:h-24 p-2 md:p-4 flex gap-x-1 items-center justify-center">
            <img src={pumpkin} alt="pumpkin" className="w-full h-full" />
          </div>
          <div className="space-y-1 text-light_grey">
            <p className="text-sm md:text-lg">Total Token Sale</p>
            <div className="flex gap-x-2 items-center">
              <p className="text-light_grey font-extrabold text-xl md:text-2xl">
                {admintotalsales?.total_token_sales} PP{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-1 text-light_grey">
          <p className="text-sm md:text-lg">Total Sale Value In SOl</p>
          <div className="flex gap-x-2 items-center relative group">
            {/* Total Sales Value */}
            <p className="text-light_grey font-extrabold text-xl md:text-2xl">
              {admintotalsales?.total_sol_sales.toFixed(4)} SOL
            </p>

            {/* Info Indicator */}
            <HiEye className="w-3 h-3 text-green-400 cursor-help group-hover:text-gray-700 transition-colors" />

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/4 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap animate-fade-in">
                {admintotalsales?.total_sol_sales} SOL
              </span>
              <div className="w-2 h-2 bg-gray-800 rotate-45 mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/*right box */}
      <div className="col-span-2  lg:col-span-3 bg-light_grey  text-blackish rounded-2xl  p-4 lg:p-6 space-y-4 md:space-y-0 grid lg:grid-cols-7">
        <div className="flex col-span-3  gap-y-4 md:gap-y-0 flex-col justify-between">
          <div className="space-y-1 ">
            <p className="text-lg ">Tokens Prices :</p>
            <p className=" font-extrabold text-xl md:text-2xl">
              1 SOL = {tokensalesummary?.pp_token_amount} PP{" "}
            </p>
          </div>
          <div className="space-y-1 ">
            <p className="text-lg">SOl Market Value:</p>
            <div className="flex gap-x-2 items-center">
              {isLoadingSol ? (
                <Spinner />
              ) : (
                <p className=" font-extrabold text-xl md:text-2xl">
                  1 SOL = {solprice || "-"} USD{" "}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center ">
          <div className="w-1 bg-grey rounded-md h-full"></div>
        </div>

        <hr className="bg-grey rounded-md md:hidden  h-[2px] col-span-3" />
        <div className="flex col-span-3 flex-col justify-between gap-y-4 md:gap-y-0">
          <div className="space-y-1">
            <p className="text-lg">Token Name :</p>
            <div className="flex gap-x-2 items-center">
              <p className=" font-extrabold text-xl md:text-2xl">
                Pump Pumpkin (PP){" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsComponent;
