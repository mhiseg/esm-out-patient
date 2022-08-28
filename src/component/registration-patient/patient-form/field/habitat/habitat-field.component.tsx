import React, { useEffect, useState } from 'react';
import { RadioButton, RadioButtonGroup } from 'carbon-components-react';
import { useTranslation } from 'react-i18next';
import { PatientRegistrationContext } from '../../patient-registration-context';
import { useField } from 'formik';
import { habitatConcept } from '../../../../resources/constants';
import { getSynchronizedCurrentUser, fetchConceptByUuid, getConceptAnswer } from '../../../../resources/resources';

export interface HabitatProps{
  className?: string;
}
export const HabitatField: React.FC<HabitatProps> = ({className}) => {
  const { t } = useTranslation();
  const [field, meta,helpers] = useField('habitat');
  const { setValue } = helpers;
  const [answers, setAnswers] = useState([])
  const [question, setQuestion] = useState("");
  
  useEffect(() => {
    const currentUserSub = getSynchronizedCurrentUser({ includeAuthStatus: true }).subscribe(async user => {
      await fetchConceptByUuid(habitatConcept, localStorage.getItem("i18nextLng")).then(res => {
        setAnswers(getConceptAnswer(res.data, setQuestion))
      })
    });

    return () => {
      currentUserSub;
    };
  }, []);

  return (
    <>
      <RadioButtonGroup
        className={className}
        labelPosition="right"
        legendText={question}
        name="habitat"
        valueSelected={field?.value?.answers?.uuid || field?.value?.answers}
        onChange={ (e) => setValue({...field.value, answers: e})} 
      >
        {answers.map((answer)=>{
          return <RadioButton labelText={answer.display} value={answer.uuid} id={answer.display} />
        })}
      </RadioButtonGroup>
    </>
  );
};
