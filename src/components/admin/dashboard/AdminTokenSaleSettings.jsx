const AdminTokenSaleSettings = ({ onOpen, stages }) => {
  const stageValues = [
    { stage: 1, value: 85000, total: 100000 },
    { stage: 2, value: 60000, total: 75000 },
    { stage: 3, value: 90000, total: 100000 },
    { stage: 4, value: 70000, total: 90000 },
    { stage: 5, value: 80000, total: 100000 },
    { stage: 5, value: 80000, total: 100000 },
  ];

  // Convert the stages object entries to an array
  const stageEntries = Object.entries(stages).map(([key, value], index) => ({
    stageKey: key, // e.g. "stage 1"
    value: value, // null in this case
  }));

  return (
    <div className=" text-white py-8 px-6">
      <h1 className="text-2xl font-bold mb-6">Tokensale Settings</h1>

      {stageEntries.map((entry, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-sm font-medium text-grey mb-2">
            {entry.stageKey.charAt(0).toUpperCase() + entry.stageKey.slice(1)}
          </h2>
          <div className="bg-white  h-8 rounded-xl relative">
            <div
              className="bg-primary h-8 rounded-xl absolute left-0"
              style={{
                width: `${
                  (stageValues[index].value / stageValues[index].total) * 100
                }%`,
              }}
            ></div>
            <div
              style={{
                left: `calc(${
                  (stageValues[index].value / stageValues[index].total) * 100
                }% - 12%)`,
              }}
              className="absolute top-1/2 transform -translate-y-1/2 text-sm font-extrabold"
            >
              {entry.value || "Not Set"}
            </div>
          </div>
          <div className="flex justify-center items-center  mt-3">
            <button
              className="hover:bg-primary bg-grey text-black font-semibold hover:text-white px-4 py-2 rounded-lg"
              onClick={() => onOpen(index + 1)}
            >
              Take Action
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminTokenSaleSettings;
