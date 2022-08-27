// import React, { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { SelectCustomObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-select/custom-selected-component-obs';
// import { getSynchronizedCurrentUser, fetchConceptByUuid, getConceptAnswer } from '../../../../resources/resources';
// import { mobilityConcept } from '../../../../search-patient/constant';
// import styles from '../field.scss';

// export const MobilityField: React.FC = () => {
//   const { t } = useTranslation();
//   const [answers, setAnswers] = useState([])
//   const [question, setQuestion] = useState("");

//   useEffect(() => {
//     const currentUserSub = getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
//       await fetchConceptByUuid(mobilityConcept, localStorage.getItem("i18nextLng")).then(res => {
//         setAnswers(getConceptAnswer(res.data,setQuestion))
//       })
//     });

//     return () => {
//       currentUserSub;
//     };
//   }, []);

//   return (
//     <>
//       <div className={styles.margin_field}>
//         <SelectCustomObs
//           options={[...answers]}
//           label={t('Select') + ' ' + question}
//           name="mobility"
//         />
//       </div>
//     </>
//   );

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
  value?: string;
}

export const MobilityField: React.FC<InputProps> = (props) => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const currentUserSub = getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
      await fetchConceptByUuid(mobilityConcept, localStorage.getItem("i18nextLng")).then(res => {
        setAnswers(getConceptAnswer(res.data,setQuestion))
      })
    });

    return () => {
      currentUserSub;
    };
  }, []);

  return (
    <>
      <div className={styles.margin_field}>
        <SelectCustomObs
          options={[...answers]}
          label={t('Select') + ' ' + question}
          name="mobility"
        />
      </div>
    </>
  );

};
