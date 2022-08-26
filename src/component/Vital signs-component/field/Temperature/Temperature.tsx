import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../registration-patient/patient-form/patient-registration/input/basic-input/input/input.component';
import styles from '../field.scss';

interface TemperatureComponentProps {
    name: string,
    className?: string
    required?: boolean
}
export const TemperatureComponent: React.FC<TemperatureComponentProps> = ({ name,required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    return (
        <>
            <Input
                type="number"
                className={styles.margin_field}
                id="taSystole"
                name={name}
                labelText={""}
                light={true}
                placeholder={t('Temperature')+ star}
                hideLabel={true}
            />
        </>
    );
};

