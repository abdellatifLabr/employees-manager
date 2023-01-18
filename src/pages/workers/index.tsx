import React, { useContext, useEffect } from "react";

import WorkersTable from "@components/workers/WorkersTable";
import { BreadcrumbContext } from "src/contexts/BreadcrumbContext";

const WorkersPage = () => {
  const { setBreadcrumb } = useContext(BreadcrumbContext);

  useEffect(
    () => setBreadcrumb([{ name: "Travailleurs", path: "/workers" }]),
    []
  );

  return (
    <div>
      <div className="flex justify-between items-center"></div>
      <div>
        <WorkersTable />
      </div>
    </div>
  );
};

export default WorkersPage;
