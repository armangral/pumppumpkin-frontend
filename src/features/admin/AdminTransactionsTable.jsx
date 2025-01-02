import React, { useState } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { HiOutlineSearch } from "react-icons/hi";

const AdminTransactionsTable = ({ transactions }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter transactions based on search query
  const filteredTransactions = transactions?.filter((transaction) =>
    transaction.wallet_address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="text-white mt-10">
      <div className="p-3 flex justify-between items-center">
        <h1 className="text-lg md:text-2xl font-bold">Transaction</h1>
        <InputGroup w={60}>
          <InputLeftElement
            width="2rem"
            ml={2}
            className="flex md:items-center items-start mt-2"
          >
            <HiOutlineSearch className="text-grey w-5 h-5" />
          </InputLeftElement>
          <Input
            type="text"
            rounded="xl"
            h="56px"
            w={60}
            placeholder="Search Wallet Address"
            border="none"
            focusBorderColor="transparent"
            outline="none"
            bg="#171717"
            value={searchQuery}
            onChange={handleSearch}
          />
        </InputGroup>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Sl</th>
              <th className="px-4 py-2 text-left">Wallet Address</th>
              <th className="px-4 py-2 text-left">PP token Amount</th>
              <th className="px-4 py-2 text-left">Amount Of Invest</th>
              <th className="px-4 py-2 text-left">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions?.length > 0 ? (
              filteredTransactions.map((row, index) => (
                <tr key={index} className="border-b border-gray-800 text-grey">
                  <td className="px-4 py-2">{row.sl}</td>
                  <td className="px-4 py-2">{row.wallet_address}</td>
                  <td className="px-4 py-2">{row.pp_token_amount} PP</td>
                  <td className="px-4 py-2">{row.amount_of_invest} SOL</td>
                  <td className="px-4 py-2">{row.date_time}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <p className="text-center text-red-700 my-6">
                    {transactions?.length === 0
                      ? "No transactions yet."
                      : "No matching transactions found."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactionsTable;
