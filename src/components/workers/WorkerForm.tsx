import Input from "@components/elements/Input";
import { Formik } from "formik";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import cn from "classnames";
import Button from "@components/elements/Button";
import Loader from "@components/Loader";
import { RadioGroup } from "@headlessui/react";
import { useQuery } from "react-query";
import supabase from "@db";
import moment from "moment";
import { useWorker } from "@hooks/workers";
import { Link } from "react-router-dom";
import Select from "@components/elements/Select";

import workerPlaceholderImage from "/assets/avatar.jpg";

const WorkerForm: React.FC<{
  initialValues: any;
  onSubmit: (data) => void;
  loading: boolean;
  replacement?: any;
}> = ({ initialValues, onSubmit, loading }) => {
  const { data: replacement } = useWorker(initialValues.replacementId);
  const { data: workers, isLoading } = useQuery(
    "no-replacement-workers",
    async () => {
      const { data, error } = await supabase
        .from("workers")
        .select("*")
        .is("replacementId", null);

      if (error) throw error;

      return data;
    },
    { staleTime: 0 }
  );

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, handleChange, handleSubmit, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="text-xl font-medium mb-2 text-gray-400 pl-1">
                Informations
              </div>
              <div className="bg-white border rounded-md p-4 pb-6">
                <div className="flex space-x-2 mb-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      label="Nom"
                      name="firstname"
                      value={values.firstname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      name="lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      label="Prénom"
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <Input
                    type="text"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                    label="Poste"
                    required
                  />
                </div>
                <div className="mb-2">
                  <Input
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    label="Numéro de télephone"
                    required
                  />
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      type="date"
                      name="next_date"
                      value={values.next_date}
                      onChange={(e) => {
                        setFieldValue("replacementId", null);
                        handleChange(e);
                      }}
                      label="Prochaine date"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      name="status"
                      value={values.status}
                      onChange={handleChange}
                      label="Statut"
                      required
                    >
                      <option value="WORKING">En travail</option>
                      <option value="BREAK">Congé</option>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2 justify-end mt-4">
                <Button type="submit" loading={loading}>
                  Enregistrer
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-2 px-1 flex justify-between items-center">
                <span className="text-xl font-medium text-gray-400">
                  Remplaçant
                </span>
                <div className="text-sm text-red-500">
                  <Link
                    to="#"
                    onClick={() => setFieldValue("replacementId", null)}
                  >
                    Suprimer
                  </Link>
                </div>
              </div>
              <div className="border rounded-md flex flex-col max-h-full overflow-y-auto bg-white">
                {isLoading ? (
                  <div className="flex items-center justify-center text-ms font-medium text-blue-600 p-8">
                    <Loader className="w-10" />
                  </div>
                ) : workers ? (
                  workers.length === 0 ? (
                    <div className="flex items-center justify-center text-ms font-medium text-gray-600 p-8">
                      <span>Pas de travailleurs ajouté</span>
                    </div>
                  ) : (
                    <RadioGroup
                      value={values.replacementId}
                      onChange={(value) => {
                        setFieldValue("replacementId", value);
                        setFieldValue(
                          "next_date",
                          workers.find((w) => w.id === value).next_date
                        );
                        setFieldValue(
                          "status",
                          workers.find((w) => w.id === value).status ===
                            "WORKING"
                            ? "BREAK"
                            : "WORKING"
                        );
                      }}
                    >
                      <RadioGroup.Label hidden>Replacement</RadioGroup.Label>
                      {replacement && (
                        <RadioGroup.Option
                          value={replacement?.id}
                          className={cn(
                            "flex justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer",
                            {
                              "bg-gray-50":
                                values.replacementId === replacement?.id,
                            }
                          )}
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex space-x-3">
                                <div>
                                  <img
                                    className="h-10 w-10 overflow-hidden rounded-full object-cover object-center border"
                                    src={
                                      replacement?.image ??
                                      workerPlaceholderImage
                                    }
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <div className="font-medium block leading-none">
                                    <span className="mr-1 text-sm">
                                      {replacement?.firstname}{" "}
                                      {replacement?.lastname}
                                    </span>
                                    <span className="text-sm font-normal text-gray-400">
                                      ({replacement?.role})
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-400">
                                    {replacement?.phone}
                                  </span>
                                  <div>
                                    <span className="text-sm mr-2 text-green-500">
                                      {moment(replacement?.next_date).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </span>
                                    <span>
                                      {replacement?.status === "WORKING" ? (
                                        <span className="text-xs rounded-full bg-green-100 px-3 py-1 font-medium text-green-500">
                                          En travail
                                        </span>
                                      ) : (
                                        <span className="text-xs rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-500">
                                          Congé
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                {checked && (
                                  <FaCheckCircle className="text-indigo-600 text-lg" />
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      )}
                      {workers.map((worker, idx) => (
                        <RadioGroup.Option
                          value={worker.id}
                          key={idx}
                          className={cn(
                            "flex justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer",
                            { "bg-gray-50": values.replacementId === worker.id }
                          )}
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex space-x-3">
                                <div>
                                  <img
                                    className="h-10 w-10 overflow-hidden rounded-full object-cover object-center border"
                                    src={worker.image ?? workerPlaceholderImage}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <div className="font-medium block leading-none">
                                    <span className="mr-1 text-sm">
                                      {worker.firstname} {worker.lastname}
                                    </span>
                                    <span className="text-sm font-normal text-gray-400">
                                      ({worker.role})
                                    </span>
                                  </div>
                                  <span className="text-sm text-gray-400">
                                    {worker.phone}
                                  </span>
                                  <div>
                                    <span className="text-sm mr-2 text-green-500">
                                      {moment(worker.next_date).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </span>
                                    {worker.status === "WORKING" ? (
                                      <span className="text-xs rounded-full bg-green-100 px-3 py-1 font-medium text-green-500">
                                        En travail
                                      </span>
                                    ) : (
                                      <span className="text-xs rounded-full bg-gray-100 px-3 py-1 font-medium text-gray-500">
                                        Congé
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div>
                                {checked && (
                                  <FaCheckCircle className="text-indigo-600 text-lg" />
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </RadioGroup>
                  )
                ) : (
                  <div className="flex items-center justify-center text-ms font-medium text-blue-600 p-8">
                    <Loader className="w-10" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default WorkerForm;
