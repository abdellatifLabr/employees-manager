import React from "react";
import { useHistory } from "react-router-dom";
import reactStringReplace from "react-string-replace";
import moment from "moment";
import { useRemoveWorker } from "@hooks/workers";
import Button from "@components/elements/Button";
import { useDialog } from "@components/elements/hooks/useDialog";

import workerPlaceholderImage from "/assets/avatar.jpg";

const Worker: React.FC<{ worker: any; name: string; onRemove: () => void }> = ({
  worker,
  name,
  onRemove,
}) => {
  const history = useHistory();
  const { mutate: removeWorker, isLoading: isRemoveLoading } =
    useRemoveWorker();
  const dialog = useDialog();

  return (
    <tr className="group hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full object-cover object-center border overflow-hidden"
              src={worker.image ?? workerPlaceholderImage}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {name
                ? reactStringReplace(worker.firstname, name, (match, i) => (
                    <span className="font-bold">{match}</span>
                  ))
                : worker.firstname}{" "}
              {name
                ? reactStringReplace(worker.lastname, name, (match, i) => (
                    <span className="font-bold">{match}</span>
                  ))
                : worker.lastname}
            </div>
            <div className="text-sm text-gray-500">{worker.phone}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{worker.role}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {worker.status === "WORKING" ? (
          <span className="text-xs rounded-full bg-green-100 px-3 py-1 font-medium text-green-500">
            En travail
          </span>
        ) : (
          <span className="text-xs rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-500">
            Congé
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm">
          <time>{moment(worker.next_date).format("DD/MM/YYYY")}</time>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {worker.replacement ? (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              <img
                className="h-10 w-10 rounded-full object-cover object-center border"
                src={worker.replacement?.image ?? workerPlaceholderImage}
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {worker.replacement?.firstname} {worker.replacement?.lastname}
              </div>
              <div className="text-sm text-gray-500">
                {worker.replacement?.phone}
              </div>
            </div>
          </div>
        ) : (
          <span className="text-xs rounded-full bg-yellow-100 px-3 py-1 font-medium text-yellow-500">
            Sans remplaçant
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          <Button
            variant="light"
            size="sm"
            className="text-blue-400"
            onClick={() => history.push(`/workers/${worker.id}/edit`)}
          >
            Modifier
          </Button>
          <Button
            variant="light"
            size="sm"
            className="text-red-400"
            loading={isRemoveLoading}
            onClick={() =>
              dialog({
                title: "Supression du travailleur",
                message: "Voulez vous vraiment suprimer ce travailleur?",
                onAccept() {
                  removeWorker(worker.id, {
                    onSuccess() {
                      onRemove();
                    },
                  });
                },
                onDecline() {},
              })
            }
          >
            Suprimer
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default Worker;
