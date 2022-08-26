import React from 'react';
import { FrequenceRespiratoireComponent } from './frequence-respiratoire/frequence-respiratoire.component';
import styles from './field/field.scss';
import { FrequenceCardiaqueComponent } from './frequence-cardiaque/frequence-cardiaque';
import { MobiliteSelect } from './mobilite/mobilite-field-component';
import { NeuroFieldComponent } from './neuro/neuro-field-component';
import { TAdiastoleComponent } from './TA diastole/TA diastole';
import { TaSystoleComponent } from './TA systole/TA-systole';
import { TemperatureComponent } from './Temperature/Temperature';
import { TraumaComponent } from './Trauma/Trauma';
const FieldVitalForm = (name: string, value?) => {
  switch (name) {
    case 'MobiliteSelect':
      return <MobiliteSelect />;
    case 'frequenceRespiratoireComponent':
      return <FrequenceRespiratoireComponent id={'frequenceRespiratoireComponent'} name={name} />
    case 'FrequenceCardiaqueComponent':
      return <FrequenceCardiaqueComponent id={'frequenceCardiqueComponent'} name={name} />
    case 'TaSystoleComponent':
      return <TaSystoleComponent id={'TaSystoleComponent'} name={name} />
    case 'TaDiastoleComponent':
      return <TAdiastoleComponent id={'TaDiastoleComponent'} name={name} />
    case 'NeuroFieldComponent':
      return <NeuroFieldComponent id={'neuroFieldComponent'} name={name}  />
    case 'TemperatureComponent':
      return <TemperatureComponent id={'TemperatureComponent'} name={name}  />
    case 'TraumaFieldComponent':
      return <TraumaComponent id={'TraumaFieldComponent'} name={name}  />

    default:
      return null
  }
}
export default FieldVitalForm;
