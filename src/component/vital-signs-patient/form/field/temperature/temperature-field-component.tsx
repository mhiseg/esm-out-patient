import React, { } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../registration-patient/patient-form/input/basic-input/input/input.component';


interface InputProps {
    className?: string;
    value?: string;
    required?: boolean;
}

export const TemperatureField: React.FC<InputProps> = ({ required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";

    return (
        <>
            <div className={styles.margin_field}>
                <Input
                    type="number"
                    className={styles.font}
                    id="temp"
                    name="temp"
                    labelText={""}
                    light={true}
                    placeholder={t('temperature') + star}
                    hideLabel={true}
                />
            </div>
        </>
    );
};

