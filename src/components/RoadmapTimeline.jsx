import React from "react";

const TimelineSegment = ({ quarter, title, details }) => {
  return (
    <div className="flex flex-row items-center mb-8">
      <div className="bg-blue-500 text-white px-4 py-2 rounded-full mr-4">
        {quarter}
      </div>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-gray-600">{details}</p>
      </div>
    </div>
  );
};

const RoadmapTimeline = () => {
  const timelineData = [
    {
      quarter: "Q1 2025",
      title: "Token Launch and Platform Launch",
      details: "Token launch and platform launch",
    },
    {
      quarter: "Q2 2025",
      title: "Establishing and Optimizing the Platform",
      details: "Establishing and optimizing the platform",
    },
    {
      quarter: "Q3 2025",
      title: "Building and Transitioning Control of the Project to a DAO",
      details:
        "Building and transitioning control of the project to a DAO for community governance",
    },
    { quarter: "Q4 2024", title: "Token Sale", details: "Token sale" },
  ];

  return (
    <div className="container mx-auto py-16">
      <h2 className="text-2xl font-bold mb-8">Roadmap Timeline</h2>
      <div className="space-y-8">
        {timelineData.map((segment, index) => (
          <TimelineSegment
            key={index}
            quarter={segment.quarter}
            title={segment.title}
            details={segment.details}
          />
        ))}
      </div>
    </div>
  );
};

export default RoadmapTimeline;
