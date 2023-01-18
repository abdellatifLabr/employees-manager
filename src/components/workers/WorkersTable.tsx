import React from "react";
import Button from "@components/elements/Button";
import { useWorkers } from "@hooks/workers";
import Loader from "@components/Loader";
import Input from "@components/elements/Input";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaPlus } from "react-icons/fa";

import Worker from "./Worker";
import { useHistory } from "react-router";

const WorkersTable = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const {
    data: { data: workers, count } = {},
    isLoading,
    refetch,
  } = useWorkers({ name }, { page, perPage });

  return (
    <>
      <div className="p-4 flex justify-between">
        <div>
          <Input
            type="text"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            className="w-64"
          />
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => history.push("/workers/create")}>
            <FaPlus className="text-sm text-white" aria-hidden="true" />
            <span>New employee</span>
          </Button>
        </div>
      </div>
      <table className="w-full divide-y divide-gray-200 overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Fullname
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Next date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Substitute
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr className="bg-white">
              <td className="p-6" colSpan={6}>
                <div className="flex items-center justify-center text-ms font-medium text-blue-600">
                  <Loader className="w-10" />
                </div>
              </td>
            </tr>
          ) : workers ? (
            workers.length === 0 ? (
              <tr className="bg-white">
                <td className="p-6" colSpan={6}>
                  <div className="flex items-center justify-center text-ms font-medium text-gray-600">
                    <span>No employees added yet</span>
                  </div>
                </td>
              </tr>
            ) : (
              workers.map((worker, idx) => (
                <Worker
                  key={idx}
                  worker={worker}
                  name={name}
                  onRemove={() => refetch()}
                />
              ))
            )
          ) : (
            <tr className="bg-white">
              <td className="p-6" colSpan={5}>
                <div className="flex items-center justify-center text-ms font-medium text-blue-600">
                  <Loader className="w-10" />
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="p-4 flex justify-between">
        <div></div>
        <div className="flex space-x-4">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <span>Showing</span>
            <Input
              type="number"
              value={perPage}
              onChange={(e) => setPerPage(parseInt(e.currentTarget.value))}
              size="sm"
              max={count?.toString()}
              className="w-16"
            />
            <span>
              of <b>{count}</b> employees
            </span>
          </div>
          <div className="flex space-x-2">
            <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
              <FaChevronLeft />
            </Button>
            <Button
              disabled={!!(count && page * perPage >= count)}
              onClick={() => setPage(page + 1)}
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkersTable;
