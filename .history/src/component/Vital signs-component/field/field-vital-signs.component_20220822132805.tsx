import React from 'react';
import { FrequenceRespiratoireComponent } from '../frequence-respiratoire/frequence-respiratoire.component';
import styles from './field/field.scss';
import { FrequenceCardiaqueComponent } from './frequence-cardiaque/frequence-cardiaque';
import { MobiliteSelect } from './mobilite/mobilite-field-component';
import { TAdiastoleComponent } from './TA diastole/TA diastole';
import { TaSystoleComponent } from './TA systole/TA-systole';
const FieldVitalForm = (name: string, value?) => {
  switch (name) {
    case 'MobiliteSelect':
      return <MobiliteSelect />;
    case 'frequenceRespiratoireComponent':
      return <FrequenceRespiratoireComponent id={'frequenceRespiratoireComponent'} name={'frequenceRespiratoireComponent'} />
    case 'FrequenceCardiaqueComponent':
      return <FrequenceCardiaqueComponent id={'frequenceCardiqueComponent'} name={'frequenceCardiqueComponent'} />
    case 'TaSystoleComponent':
      return <TaSystoleComponent id={'TaSystoleComponent'} name={'TaSystoleComponent'} />
    case 'TaDiastoleComponent':
      return <TAdiastoleComponent id={'TaDiastoleComponent'} name={'TaDiastoleComponent'} />
      case 'neuroFieldComponent':
      return <neuroFieldComponent id={'neuroFieldComponent'} name={'neuroFieldComponent'} />
    default:
      return null
  }
}
export default FieldVitalForm;
