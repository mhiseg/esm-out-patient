import React, { useContext, useEffect, useState } from 'react';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'carbon-components-react';
import { useField } from 'formik';
import { SelectInput } from '../../../../registration-patient/patient-form/input/basic-input/select/select-input.component';


interface InputProps {
  required?: boolean;
  className?: string;
  value?: string;
}

export const NeuroField: React.FC<InputProps> = (props) => {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("Mobilite");


  return (
    <>
      <div className={styles.margin_field}>
        <SelectInput
          options={[...answers]}
          label={t('Select') + ' ' + question}
          name="neuro"
        />
      </div>
    </>
  );

};
