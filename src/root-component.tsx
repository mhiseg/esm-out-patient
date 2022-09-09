import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PatientDashboard from './component/dashboard/patient/dashboard-patient-component';
import PatientRegistration from './component/registration-patient/patient-registration-component';
import SearchPatient from './component/search-patient/searchPatient/searchPatient';
import VitalSignsComponent from './component/vital-signs-patient/vital-signs-component';



const RootComponent: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/out-patient`}>
      <Route path="/search" component={SearchPatient} exact />
      <Route path="/vital-signs/:visitUuid" component={VitalSignsComponent} exact />
      <Route path="/patient" component={PatientRegistration} exact />
      <Route path='/patient/:patientUuid' component={PatientRegistration} exact />
      <Route path='/dashboard/patient/:patientUuid' component={PatientDashboard} exact />
    </BrowserRouter>
  );
};

export default RootComponent;
