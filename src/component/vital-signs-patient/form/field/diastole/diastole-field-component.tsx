import React, { } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { InputObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-input/input.component-obs';


interface InputProps {
    required?: boolean
}
export const DiastoleField: React.FC<InputProps> = ({ required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    
    return (
        <div className={styles.margin_field}>
            <InputObs
                className={styles.font}
                type="number"
                id="TaDiastole"
                name="taDiastole"
                labelText={""}
                light={true}
                placeholder={t('TaDiastole') + star}
            />
        </div>
    );
};

