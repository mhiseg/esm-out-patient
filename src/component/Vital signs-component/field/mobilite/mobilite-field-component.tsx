import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectCustomObs } from '../../../registration-patient/patient-form/patient-registration/input/custom-input/custom-select/custom-selected-component-obs';
import { getSynchronizedCurrentUser, fetchConceptByUuid, getConceptAnswer } from '../../../registration-patient/patient-form/patient-registration/patient-registration.ressources';
import { mobilityConcept } from '../../constants';
import styles from '../field.scss';

export const MobiliteSelect: React.FC = () => {
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
          name="mobilite"
        />
      </div>
    </>
  );

};