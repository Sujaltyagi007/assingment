import React from "react";
import { ChartAreaInteractive } from "../chart-area-interactive";

export default function Analytics() {
  return (
    <div className=" h-full overflow-y-scroll">
      <div className="px-4 lg:px-6 py-2">
        <ChartAreaInteractive />
      </div>
      {/* {!dashBoardData || dashBoardData.length === 0 ? (
        <div className="flex items-center gap-2 justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          Loading...
        </div>
      ) : (
        <DataTable data={dashBoardData} />
      )} */}
    </div>
  );
}
