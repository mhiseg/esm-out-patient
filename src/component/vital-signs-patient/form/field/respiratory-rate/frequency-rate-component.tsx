import React, {  } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { InputObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-input/input.component-obs';


interface InputProps {
   required?: boolean; 
    className?: string;
    value?: string;
}

export const FrequencyRateField: React.FC<InputProps> = ({ required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    
    return (
        <div className={styles.margin_field} >

            <InputObs
                type="number"
                className={styles.font}
                id="frequenceR"
                name="respiratoryRate"
                labelText={""}
                light={true}
                placeholder={t('frequenceR')+ star}
                hideLabel={true}
            />
        </div>
    );
};



