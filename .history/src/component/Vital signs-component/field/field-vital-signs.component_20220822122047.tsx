import React from 'react';
import { FrequenceRespiratoireComponent } from '../frequence-respiratoire/frequence-respiratoire.component';
import styles from './field/field.scss';
import { MobiliteSelect } from './mobilite/mobilite-field-component';
const FieldVitalForm = (name: string, value?) => {
  switch (name) {
    case 'MobiliteSelect':
      return <MobiliteSelect />;
    case 'frequenceRespiratoireComponent':
      return <FrequenceRespiratoireComponent id={'frequenceRespiratoireComponent'} name={'frequenceRespiratoireComponent'} />
    default:
      return null
  }
}
export default FieldVitalForm;
