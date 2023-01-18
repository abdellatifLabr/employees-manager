import { Tab } from "@headlessui/react";
import React, { useContext, useEffect } from "react";
import { FaBell, FaCog, FaLock } from "react-icons/fa";
import cn from "classnames";
import Input from "@components/elements/Input";
import { useSettings } from "@hooks/settings";
import { Formik } from "formik";
import Button from "@components/elements/Button";
import { BreadcrumbContext } from "src/contexts/BreadcrumbContext";

const SettingsPage = () => {
  const { settings, updateSettings, isLoading } = useSettings();
  const { setBreadcrumb } = useContext(BreadcrumbContext);

  useEffect(() => setBreadcrumb([{ name: "Settings", path: "/settings" }]), []);

  return (
    <div className="h-full">
      <div className="flex h-full">
        <Tab.Group vertical>
          <Tab.List className="flex flex-col space-y-2 w-80 bg-white px-4 py-8 border-r">
            <Tab
              className={({ selected }) =>
                cn(
                  "flex items-center space-x-2 px-4 py-3 rounded hover:bg-gray-50",
                  {
                    "bg-gray-50": selected,
                  }
                )
              }
            >
              {({ selected }) => (
                <>
                  <FaCog
                    className={cn("text-gray-400", {
                      "text-blue-500": selected,
                    })}
                  />
                  <span
                    className={cn("font-medium", { "text-blue-500": selected })}
                  >
                    General
                  </span>
                </>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels className="flex-1">
            {settings && (
              <div className="bg-white p-6 h-full">
                <Tab.Panel>
                  <Formik
                    initialValues={{
                      WORK_DURATION: settings?.find(
                        (setting) => setting.name === "WORK_DURATION"
                      )?.value,
                      BREAK_DURATION: settings?.find(
                        (setting) => setting.name === "BREAK_DURATION"
                      )?.value,
                    }}
                    onSubmit={(data) => {
                      for (let setting in data) {
                        updateSettings({ name: setting, value: data[setting] });
                      }
                    }}
                  >
                    {({ values, handleChange, handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <Input
                          className="w-64 mb-4"
                          type="number"
                          name="WORK_DURATION"
                          label={
                            settings?.find(
                              (setting) => setting.name === "WORK_DURATION"
                            )?.display
                          }
                          onChange={handleChange}
                          value={values.WORK_DURATION}
                        />
                        <Input
                          className="w-64 mb-4"
                          type="number"
                          name="BREAK_DURATION"
                          label={
                            settings?.find(
                              (setting) => setting.name === "BREAK_DURATION"
                            )?.display
                          }
                          onChange={handleChange}
                          value={values.BREAK_DURATION}
                        />
                        <Button type="submit" loading={isLoading}>
                          Save
                        </Button>
                      </form>
                    )}
                  </Formik>
                </Tab.Panel>
              </div>
            )}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default SettingsPage;
