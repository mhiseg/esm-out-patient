import { createErrorHandler } from '@openmrs/esm-framework';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { maritalStatusConcept } from '../../../../resources/constants';
import { getSynchronizedCurrentUser, fetchConceptByUuid } from '../../../../resources/patient-resources';
import { getConceptAnswer } from '../../../../resources/resources';
import { SelectCustomObs } from '../../input/custom-input/custom-select/custom-selected-component-obs';
import styles from '../field.scss';

interface StatusProps {
  className?: string;
}
export const StatusField: React.FC<StatusProps> = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([{}])
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const currentUserSub = getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
      await fetchConceptByUuid(maritalStatusConcept, localStorage.getItem("i18nextLng")).then(res => {
        setAnswers(getConceptAnswer(res.data,setQuestion))
      })
    });

    return () => {
      currentUserSub;
    };
  }, []);

  return (
    <>
      <SelectCustomObs
        className={styles.margin_field}
        options={[...answers]}
        label={t('Select') + ' ' + question}
        name="status"
      />
    </>
  );
};