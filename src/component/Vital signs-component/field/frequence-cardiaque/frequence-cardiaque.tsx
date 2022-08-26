import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../registration-patient/patient-form/patient-registration/input/basic-input/input/input.component';
import styles from '../field.scss';

interface FrequenceCardiaqueProps {
    name: string,
    className?: string
    required?: boolean
}
export const FrequenceCardiaqueComponent: React.FC<FrequenceCardiaqueProps> = ({ name,required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    return (
        <>
            <Input
                type="number"
                className={styles.margin_field}
                id="frequenceC"
                name={name}
                labelText={""}
                light={true}
                placeholder={t('frequenceC') + star}
                hideLabel={true}
            />
        </>
    );
};