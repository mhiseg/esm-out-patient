import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PatientRegistration from './component/registration-patient/patient-registration-component';
import FindPatientComponent from './component/search-patient-component/find-patient-component';
import VitalSignsComponent from './component/Vital signs-component/vital-signs-component';


const RootComponent: React.FC = () => {
  return (
    <BrowserRouter basename={`${window.spaBase}/out-patient`}>
      <Route path="/search" exact>
        <FindPatientComponent />
      </Route>
      <Route path="/vitalSigns" exact>
        <VitalSignsComponent />
      </Route>
      <Route exact path="/patient"  component={PatientRegistration} />
      <Route exact path='/patient/:patientUuid'>
    		<PatientRegistration />
    	</Route>
      
    </BrowserRouter>
  );
};

export default RootComponent;
