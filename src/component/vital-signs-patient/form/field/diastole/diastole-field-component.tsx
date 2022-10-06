import React, { } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../registration-patient/patient-form/input/basic-input/input/input.component';


interface InputProps {
    required?: boolean,
    className?: string
}
export const DiastoleField: React.FC<InputProps> = ({ required,className }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";

    return (
        <div className={styles.margin_field}>
       

            <Input
                className={className}
                type="number"
                id="TaDiastole"
                name="taDiastole"
                labelText={""}
                light={true}
                placeholder={t('TaDiastole') + star}
                hideLabel={true}
            />
        </div>
    );
};

