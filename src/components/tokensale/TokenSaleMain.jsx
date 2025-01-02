/* eslint-disable react/prop-types */
import { Input, Spinner } from "@chakra-ui/react";
import toast from "react-hot-toast";
import { FaEquals } from "react-icons/fa";
import { SiSolana } from "react-icons/si";

import pumpkin from "src/assets/img/token/whitepumpkin.svg";

const TokenSaleMain = ({
  isLoadingSaleSummary,
  onOpenWithdrawOpen,
  tokensalesummary,
  solInput,
  ppOutput,
  handleSolInputChange,
}) => {
  const handleBuyNow = () => {
    if (solInput > 0) {
      onOpenWithdrawOpen();
    } else {
      toast.error("Please enter a positive SOL amount to proceed!");
    }
  };

  return (
    <main className="flex flex-col text-center mt-12 max-w-7xl px-6">
      <div className="flex flex-col items-center relative space-y-6 ">
        {/* Start Content */}
        <div className="max-w-6xl lg:space-y-10 ">
          <div className="text-4xl md:text-5xl lg:text-7xl font-extrabold space-y-3 ">
            <p>Join Early And Enjoy The </p>
            <p>Platform Profit</p>
          </div>
          <p className="text-grey font-light mt-4 lg:text-2xl text-sm lg:px-20">
            Profits Big Time With PP Token Tokens Sale In Stages The Early U Buy
            The Better 6 stages and saying price will raise by the next stage so
            there is 6 stages for the tokensale and each stage will make the
            price raise
          </p>
        </div>
        <p className="text-primary font-semibold text-xl lg:text-2xl">
          <span className="text-white">01/</span>{" "}
          <span className="text-grey">06</span> Stage Ongoing Sale{" "}
        </p>
        {isLoadingSaleSummary ? (
          <Spinner className="text-white" />
        ) : (
          <div className="w-full  flex justify-center">
            <div className="lg:max-w-5xl w-full  space-y-10 ">
              {/* <div className="bg-grey rounded-xl md:h-8 h-14 grid grid-cols-6 font-semibold text-sm">
                <div className="col-span-1 bg-primary rounded-l-xl flex items-center px-4">
                  Stage One
                </div>
                <div className="col-span-1 flex items-center px-4">
                  Stage Two
                </div>
                <div className="col-span-1 flex items-center px-4">
                  Stage Three
                </div>
                <div className="col-span-1 flex items-center px-4">
                  Stage Four
                </div>
                <div className="col-span-1 flex items-center px-4">
                  Stage Five
                </div>
                <div className="col-span-1 rounded-r-xl flex items-center px-4">
                  Stage Six
                </div>
              </div> */}

              {/* Stage Bar */}
              <div className="bg-grey rounded-xl md:h-8 h-14 grid grid-cols-6 font-semibold text-sm">
                {["One", "Two", "Three", "Four", "Five", "Six"].map(
                  (stage, index) => (
                    <div
                      key={index}
                      className={`col-span-1 flex items-center px-4 ${
                        tokensalesummary?.stage === index + 1
                          ? "bg-primary text-white"
                          : ""
                      } ${index === 0 ? "rounded-l-xl" : ""} ${
                        index === 5 ? "rounded-r-xl" : ""
                      }`}
                    >
                      Stage {stage}
                    </div>
                  )
                )}
              </div>

              <div className=" flex items-center justify-between">
                <div className="gradient-color rounded-full w-16 h-16 p-2 md:p-2 flex gap-x-1 items-center justify-center">
                  <SiSolana className="w-6 h-6" />
                </div>{" "}
                <p className="lg:text-4xl text-base font-semibold">
                  1 Pumpkin ={" "}
                  {tokensalesummary?.usd_per_token?.toFixed(6) || "-"} USD
                </p>
                <div className="gradient-color rounded-full w-16 h-16 p-2 md:p-2 flex gap-x-1 items-center justify-center">
                  <img src={pumpkin} alt="pumpkin" className="w-10 h-10" />
                </div>{" "}
              </div>
              {/* Input/Output Section */}
              <div className="grid lg:grid-cols-7 space-y-2 lg:space-y-0">
                <div className="col-span-3 space-y-1">
                  <p className="text-left font-medium text-xs lg:text-xl">
                    Pay token (SOL)
                  </p>
                  <Input
                    type="text"
                    value={solInput}
                    onChange={handleSolInputChange}
                    rounded="md"
                    h={"56px"}
                    border="none"
                    focusBorderColor="transparent"
                    outline="none"
                    className="col-span-3"
                    bg="#212629"
                    fontWeight={800}
                    fontSize={28}
                  />
                </div>
                <div className="col-span-3 lg:col-span-1 flex justify-center items-center mt-4">
                  <FaEquals className="text-white h-6 w-10 lg:mt-4" />
                </div>
                <div className="col-span-3 space-y-1">
                  <p className="text-left font-medium text-xs lg:text-xl">
                    Get Token (Pumpkin)
                  </p>
                  <Input
                    type="text"
                    value={ppOutput}
                    readOnly
                    rounded="md"
                    fontWeight={800}
                    h={"56px"}
                    border="none"
                    focusBorderColor="transparent"
                    outline="none"
                    className="col-span-3"
                    bg="#212629"
                    fontSize={28}
                  />
                </div>
              </div>
              <div className=" grid lg:grid-cols-7 space-y-2 lg:space-y-0">
                <button
                  className="col-span-7 lg:text-2xl gradient-color text-white font-bold py-3 px-4 rounded-[4px] flex gap-x-2 items-center justify-center"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default TokenSaleMain;
