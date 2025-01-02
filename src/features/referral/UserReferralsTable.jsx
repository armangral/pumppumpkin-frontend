import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { formatTimestamp } from "src/utils/utilities";

const UserReferralsTable = ({ transactions }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the current 'days' parameter from URL or default to 'all'
  const currentDays = searchParams.get("days") || "all";

  const handleDaysChange = (days) => {
    setSearchParams({ days: days });
  };

  const getButtonClass = (value) => {
    return `px-2 hover:bg-primary ${
      currentDays === value ? "bg-primary" : ""
    } ${
      value === "1"
        ? "rounded-l-md pl-4 pr-2"
        : value === "all"
        ? "rounded-r-md pl-2 pr-4"
        : ""
    }`;
  };

  return (
    <div className="text-white mt-10">
      <div className="p-3 flex justify-between">
        <h1 className="text-lg md:text-2xl font-bold mb-4">
          Referral User Details
        </h1>
        <div className="bg-[#313131] rounded-md flex h-8">
          <button
            className={getButtonClass("1")}
            onClick={() => handleDaysChange("1")}
          >
            1d
          </button>
          <button
            className={getButtonClass("7")}
            onClick={() => handleDaysChange("7")}
          >
            7d
          </button>
          <button
            className={getButtonClass("15")}
            onClick={() => handleDaysChange("15")}
          >
            15d
          </button>
          <button
            className={getButtonClass("30")}
            onClick={() => handleDaysChange("30")}
          >
            30D
          </button>
          <button
            className={getButtonClass("all")}
            onClick={() => handleDaysChange("all")}
          >
            ALL
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="">
              <th className="px-4 py-2">SL</th>
              <th className="px-4 py-2">Wallet</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Hash</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Invest Amount</th>
              <th className="px-4 py-2">My Earning</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.length > 0 ? (
              <>
                {transactions?.map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-800 text-grey"
                  >
                    <td className="px-4 py-2">{row.SL}</td>
                    <td className="px-4 py-2">{row.wallet}</td>
                    <td className="px-4 py-2">{row.code}</td>
                    <td className="px-4 py-2">{row.hash}</td>
                    <td className="px-4 py-2">{formatTimestamp(row.date)}</td>
                    <td className="px-4 py-2">{row.sol_amount.toFixed(10)}</td>
                    <td className="px-4 py-2">{row.earning.toFixed(15)}</td>
                    <td className="px-4 py-2">
                      {row.status ? "Paid" : "Not Paid"}
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="text-center my-6">
                <td>No transactions found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserReferralsTable;
