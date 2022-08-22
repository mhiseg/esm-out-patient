import React from 'react';
import styles from './field/field.scss';
import { MobiliteSelect } from './mobilite/mobilite-field-component';
const FieldVitalForm = (name: string, value?) => {
  switch (name) {  
    case 'MobiliteSelect':
      return <MobiliteSelect/>;
    case 'familyName':
      return <FamilyNameField name={name} className={styles.margin_field}/>;
    case 'idType':
      return <IdSelect />;
    case 'idValue':
      return <IdField/>;
    case 'gender':
      return <GenderField className={styles.radio}/>;
    case 'habitat':
      return <HabitatField className={styles.radio}/>;
    case 'status':
      return <StatusField />;
    case 'occupation':
      return <OccupationSelect />;
    case 'phone':
      return <PhoneField name={name} className={styles.margin_field}/>;
    case 'residence':
      return <ResidenceField value={value}/>;
    case 'birthPlace':
      return <BirthPlace value={value} />;
    case 'dob':
      return <DobField birthdate={value?.birthdate} age={value?.age} months={value?.months} birthdateEstimated={value?.birthdateEstimated} />;
    default:
      return null
  }
}
~
export default FieldVitalForm;
