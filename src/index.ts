import { getAsyncLifecycle, defineConfigSchema } from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

const backendDependencies = {
  fhir2: "^1.2.0",
  "webservices.rest": "^2.2.0",
};

function setupOpenMRS() {
  const moduleName = "@mhiseg/esm-out-patient-app";

  const options = {
    featureName: "out-patient-app",
    moduleName,
  };

  defineConfigSchema(moduleName, configSchema);

  return {
    pages: [
      {
        load: getAsyncLifecycle(() => import("./root-component"), options),
        route: "out-patient",
      },
    ],
    extensions: [
      {
         id: "out-patient-link",
         slot: "app-menu-slot",
         load: getAsyncLifecycle(
           () => import("./refapp-links/refapp-links"),
           options
         ),
         privilege: "App: out-patient.clinics",
        }
     ],
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };
