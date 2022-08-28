// import React, { useEffect, useState } from 'react';
// import styles from '../field.scss';
// import { useTranslation } from 'react-i18next';
// import { SelectCustomObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-select/custom-selected-component-obs';
// import { getSynchronizedCurrentUser, fetchConceptByUuid, getConceptAnswer } from '../../../../resources/resources';
// import { traumaConcept } from '../../../../resources/constants';

// interface InputProps {
//     className?: string;
//     value: any;
// }
// export const TraumaField: React.FC<InputProps> = ({value}) => {
//     const { t } = useTranslation();
//     const [answers, setAnswers] = useState([])
//     const [question, setQuestion] = useState("");

//     useEffect(() => {
//         const currentUserSub = getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
//             await fetchConceptByUuid(traumaConcept, localStorage.getItem("i18nextLng")).then(res => {
//                 setAnswers(getConceptAnswer(res.data, setQuestion))
//             })
//         });

//         return () => {
//             currentUserSub;
//         };
//     }, []);

//     return (
//         <>
//             <div className={styles.margin_field}>
//                 <SelectCustomObs
//                     options={[...value.answers]}
//                     label={t('Select') + ' ' + value.question}
//                     name="trauma"
//                 />
//             </div>
//         </>
//     );

// };

import React, { useEffect, useState } from 'react';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { SelectCustomObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-select/custom-selected-component-obs';
import { getSynchronizedCurrentUser, fetchConceptByUuid, getConceptAnswer } from '../../../../resources/resources';
import { mobilityConcept, neuroConcept } from '../../../../resources/constants';


interface InputProps {
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  className?: string;
  value: any;
}

export const TraumaField: React.FC<InputProps> = ({value}) => {
  const { t } = useTranslation();


  return (
    <>
      <div className={styles.margin_field}>
        <SelectCustomObs
          options={[...value.answers]}
          label={t('Select') + ' ' + value.question}
          name="trauma"
        />
      </div>
    </>
  );

};
