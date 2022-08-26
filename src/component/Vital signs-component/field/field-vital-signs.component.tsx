import React from 'react';
import { FrequenceRespiratoireComponent } from './frequence-respiratoire/frequence-respiratoire.component';
import { FrequenceCardiaqueComponent } from './frequence-cardiaque/frequence-cardiaque';
import { MobiliteSelect } from './mobilite/mobilite-field-component';
import { NeuroFieldComponent } from './neuro/neuro-field-component';
import { TaDiastoleComponent } from './TA diastole/TA diastole';
import { TaSystoleComponent } from './TA systole/TA-systole';
import { TemperatureComponent } from './Temperature/Temperature';
import { TraumaComponent } from './Trauma/Trauma';
const FieldVitalForm = (name: string) => {
  switch (name) {
    case 'mobilite':
      return <MobiliteSelect />;
    case 'frequenceR':
      return <FrequenceRespiratoireComponent name={name} required={true}/>
    case 'frequenceC':
      return <FrequenceCardiaqueComponent name={name} required={true}/>
    case 'taSystole':
      return <TaSystoleComponent  name={name} required={true}/>
    case 'taDiastole':
      return <TaDiastoleComponent  name={name} required={true}/>
    case 'neuro':
      return <NeuroFieldComponent  name={name} required={true}/>
    case 'temp':
      return <TemperatureComponent name={name} required={true}/>
    case 'trauma':
      return <TraumaComponent  name={name} required={true}/>
    default:
      return null
  }
}
export default FieldVitalForm;
