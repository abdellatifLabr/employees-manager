import React, { Suspense, useState } from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import Loader from "@components/Loader";
import {
  BreadcrumbContent,
  BreadcrumbContext,
} from "./contexts/BreadcrumbContext";

const WorkersPage = React.lazy(() => import("@pages/workers"));
const CreateWorkerPage = React.lazy(
  () => import("@pages/workers/CreateWorkerPage")
);
const UpdateWorkerPage = React.lazy(
  () => import("@pages/workers/UpdateWorkerPage")
);
const CalendarPage = React.lazy(() => import("@pages/CalendarPage"));
const SettingsPage = React.lazy(() => import("@pages/SettingsPage"));

const queryClient = new QueryClient();

function App() {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbContent>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
        <Router>
          <div className="bg-gray-50 flex flex-col fixed w-full h-full">
            <Header />
            <div className="flex-1 bg-gray-50 overflow-auto">
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader className="text-blue-600 w-12" />
                  </div>
                }
              >
                <Route path="/workers" exact>
                  <WorkersPage />
                </Route>
                <Route path="/workers/create" exact>
                  <CreateWorkerPage />
                </Route>
                <Route path="/workers/:id/edit" exact>
                  <UpdateWorkerPage />
                </Route>
                <Route path="/calendar" exact>
                  <CalendarPage />
                </Route>
                <Route path="/settings" exact>
                  <SettingsPage />
                </Route>
                <Route path="/" exact>
                  <Redirect to="/calendar" />
                </Route>
              </Suspense>
            </div>
          </div>
        </Router>
      </BreadcrumbContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
