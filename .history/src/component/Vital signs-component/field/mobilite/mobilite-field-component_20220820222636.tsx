import { createErrorHandler } from '@openmrs/esm-framework';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../field.scss';

export const OccupationSelect: React.FC = () => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("");


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