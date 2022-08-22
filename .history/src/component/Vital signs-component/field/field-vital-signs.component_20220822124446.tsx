import React from 'react';
import { FrequenceRespiratoireComponent } from '../frequence-respiratoire/frequence-respiratoire.component';
import styles from './field/field.scss';
import { FrequenceCardiaqueComponent } from './frequence-cardiaque/frequence-cardiaque';
import { MobiliteSelect } from './mobilite/mobilite-field-component';
const FieldVitalForm = (name: string, value?) => {
  switch (name) {
    case 'MobiliteSelect':
      return <MobiliteSelect />;
    case 'frequenceRespiratoireComponent':
      return <FrequenceRespiratoireComponent id={'frequenceRespiratoireComponent'} name={'frequenceRespiratoireComponent'} />
      case 'FrequenceCardiaqueComponent':
      return <FrequenceCardiaqueComponent id={'frequenceRespiratoireComponent'} name={'frequenceRespiratoireComponent'} />
    default:
      return null
  }
}
export default FieldVitalForm;
