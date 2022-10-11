import React, {  } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../registration-patient/patient-form/input/basic-input/input/input.component';


interface InputProps {
   required?: boolean; 
    className?: string;
    value?: string;
}

export const FrequencyRateField: React.FC<InputProps> = ({ required,className }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    
    return (
        <div className={styles.margin_field} >
             <Input
                className={className}
                type="number"
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



