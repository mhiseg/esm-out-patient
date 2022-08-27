import React, {  } from 'react';
import styles from '../../field/field.scss';
import { useTranslation } from 'react-i18next';
import { InputObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-input/input.component-obs';


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
            <InputObs
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