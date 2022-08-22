import { createErrorHandler } from '@openmrs/esm-framework';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SelectCustomObs } from '../../../registration-patient/patient-form/patient-registration/input/custom-input/custom-select/custom-selected-component-obs';
import styles from '../field.scss';

export const MobiliteSelect: React.FC = () => {
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