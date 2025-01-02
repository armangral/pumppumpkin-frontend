import { HiEye } from "react-icons/hi";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const data = [{ label: "Token Sale", value: 100, color: "#1A75FF" }];

const UserValueCircle = ({ value }) => {
  return (
    <div className="relative h-full w-full ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            // innerRadius={100}
            // outerRadius={150}
            innerRadius="70%"
            outerRadius="90%"
            fill="#8884d8"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute  inset-0 flex justify-center items-center">
        <div className="drop-shadow-xl text-white w-[64%] h-[64%] flex flex-col items-center rounded-full justify-center space-y-2">
          <h2 className="text-sm">PP Holdings Value</h2>
          <div className="relative flex items-center gap-x-2 group">
            <p className="text-light_grey font-bold text-xl md:text-2xl whitespace-nowrap">
              $ {value?.toFixed(3)}{" "}
            </p>

            <HiEye className="w-3 h-3 text-green-400 cursor-help group-hover:text-gray-700 transition-colors" />

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center">
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap z-10 animate-fade-in">
                $ {value}
              </span>
              <div className="w-2 h-2 bg-gray-800 rotate-45 mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserValueCircle;
