import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { occupationConcept } from '../../../../resources/constants';
import { getSynchronizedCurrentUser, fetchConceptByUuid, getConceptAnswer } from '../../../../resources/resources';
import { SelectCustomObs } from '../../input/custom-input/custom-select/custom-selected-component-obs';
import styles from '../field.scss';

export const OccupationSelect: React.FC = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const currentUserSub = getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
      await fetchConceptByUuid(occupationConcept, localStorage.getItem("i18nextLng")).then(res => {
        console.log("Concept received",res.data);
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
        name="occupation"
      />
    </>
  );

};