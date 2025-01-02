import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { label: "Token Sale", value: 58, color: "#1A75FF" },
  { label: "Liquidity", value: 20, color: "#0B4094" },
  { label: "Team Members", value: 17, color: "#57B6E7" },
  { label: "Consultants", value: 5, color: "#438EFF" },
];

const TokenomicsChart = () => {
  return (
    <div className="flex flex-col md:mx-auto md:items-center text-center my-12 max-w-7xl">
      <h2 className="text-3xl lg:text-5xl font-bold mb-4">Tokenomics</h2>
      <p className="mb-12 text-lg max-w-3xl">
        Our tokenomics ensures transparency and sustainability, driving value
        and growth within our ecosystem.
      </p>
      <div className="grid grid-cols-2 items-center gap-8 md:gap-0 max-w-7xl">
        {/* Pie Chart */}
        <div className=" col-span-2 lg:col-span-1 flex justify-start   rounded-lg">
          <div className="relative h-96 lg:h-[500px] lg:w-[500px] w-full ">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="label"
                  // innerRadius={100}
                  // outerRadius={150}
                  innerRadius="65%"
                  outerRadius="90%"
                  fill="#8884d8"
                  stroke="none"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute  inset-0 flex justify-center items-center">
              <div className=" bg-white text-black w-[64%] h-[64%] flex flex-col items-center rounded-full justify-center">
                <h2 className="text-2xl font-extrabold">Tokenomics</h2>
                <p className="text-3xl font-extrabold">100%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Bars */}
        <div className=" col-span-2 lg:col-span-1 p-4 rounded-lg space-y-6">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between font-bold text-2xl md:text-3xl">
                <span>
                  {item.value}%: {item.label}
                </span>
              </div>
              <div className="w-full md:w-[600px] bg-whitish h-3 rounded-full">
                <div
                  className="h-3 rounded-full"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-grey max-w-3xl">
        #All roadmap timelines and tokenomics allocations are subject to change
        to ensure optimal outcomes and maximum value for PP token holders.
      </p>
    </div>
  );
};

export default TokenomicsChart;
