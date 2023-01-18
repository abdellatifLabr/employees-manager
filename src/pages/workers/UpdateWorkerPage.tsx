import React, { useContext, useEffect } from "react";

import WorkerForm from "@components/workers/WorkerForm";
import { useHistory, useParams } from "react-router-dom";
import { useUpdateWorker, useWorker } from "@hooks/workers";
import { BreadcrumbContext } from "src/contexts/BreadcrumbContext";

const UpdateWorkerPage = () => {
  const history = useHistory();
  const { id } = useParams<any>();
  const { data: worker } = useWorker(id);
  const { mutate: updateWorker, isLoading } = useUpdateWorker();

  const { setBreadcrumb } = useContext(BreadcrumbContext);

  useEffect(
    () =>
      setBreadcrumb([
        { name: "Travailleurs", path: "/workers" },
        {
          name: `${worker?.firstname ?? ""} ${worker?.lastname ?? ""}`,
        },
        { name: "Modifier" },
      ]),
    [worker]
  );

  return (
    <div className="p-8">
      <div>
        {worker && (
          <WorkerForm
            initialValues={{
              firstname: worker.firstname,
              lastname: worker.lastname,
              role: worker.role,
              phone: worker.phone,
              next_date: worker.next_date,
              replacementId: worker.replacementId,
            }}
            onSubmit={(data) =>
              updateWorker(
                { id: worker.id, worker: data },
                {
                  onSuccess() {
                    history.push("/workers");
                  },
                }
              )
            }
            loading={isLoading}
            replacement={worker.replacement}
          />
        )}
      </div>
    </div>
  );
};

export default UpdateWorkerPage;
