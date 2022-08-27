import React, {  } from 'react';
import styles from '../../field/field.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../registration-patient/patient-form/input/basic-input/input/input.component';


interface InputProps {
    required?: boolean;
    className?: string;
    value?: string;
}

export const CardiacFrequencyField: React.FC<InputProps> = ({ required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    return (
        <>
            <Input
                type="number"
                className={styles.margin_field}
                id="cardiacFrequency"
                name="cardiacFrequency"
                labelText={""}
                light={true}
                placeholder={t('frequenceC') + star}
                hideLabel={true}
            />
        </>
    );
};