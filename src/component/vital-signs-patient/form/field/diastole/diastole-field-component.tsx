import React, {  } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { InputObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-input/input.component-obs';


interface InputProps {
    className?: string
    required?: boolean
}
export const DiastoleField: React.FC<InputProps> = ({ required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    return (
        <>
            <InputObs
                type="number"
                className={styles.margin_field}
                id="TaDiastole"
                name="taDiastole"
                labelText={""}
                light={true}
                placeholder={t('TaDiastole')+ star}
            />
        </>
    );
};

