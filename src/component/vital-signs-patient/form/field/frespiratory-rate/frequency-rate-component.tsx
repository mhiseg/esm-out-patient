import React, {  } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../registration-patient/patient-form/input/basic-input/input/input.component';


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
        <>
            <Input
                type="number"
                className={styles.margin_field}
                id="frequenceR"
                name="respiratoryRate"
                labelText={""}
                light={true}
                placeholder={t('frequenceR')+ star}
                hideLabel={true}
            />
        </>
    );
};


