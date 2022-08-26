import React, { useEffect, useState } from 'react';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { SelectCustomObs } from '../../../registration-patient/patient-form/patient-registration/input/custom-input/custom-select/custom-selected-component-obs';
import { getSynchronizedCurrentUser, fetchConceptByUuid, getConceptAnswer } from '../../../registration-patient/patient-form/patient-registration/patient-registration.ressources';
import { neuroConcept } from '../../constants';


interface InputProps {
  name: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  prefix?: string;
  className?: string;
  value?: string;
}

export const NeuroFieldComponent: React.FC<InputProps> = (props) => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const currentUserSub = getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
      await fetchConceptByUuid(neuroConcept, localStorage.getItem("i18nextLng")).then(res => {
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
          name="neuro"
        />
      </div>
    </>
  );

};
