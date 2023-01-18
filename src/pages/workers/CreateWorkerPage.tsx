import React, { useContext, useEffect } from "react";

import WorkerForm from "@components/workers/WorkerForm";
import { useHistory } from "react-router-dom";
import { useCreateWorker } from "@hooks/workers";
import { BreadcrumbContext } from "src/contexts/BreadcrumbContext";

const CreateWorkerPage = () => {
  const history = useHistory();
  const { setBreadcrumb } = useContext(BreadcrumbContext);
  const { mutate: createWorker, isLoading } = useCreateWorker();

  useEffect(
    () =>
      setBreadcrumb([
        { name: "Travailleurs", path: "/workers" },
        { name: "Créer", path: "/workers/create" },
      ]),
    []
  );

  return (
    <div className="p-8">
      <div>
        <WorkerForm
          initialValues={{
            firstname: "",
            lastname: "",
            role: "",
            phone: "",
            next_date: "",
            replacementId: null,
          }}
          onSubmit={(data) =>
            createWorker(data, {
              onSuccess() {
                history.push("/workers");
              },
            })
          }
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateWorkerPage;
