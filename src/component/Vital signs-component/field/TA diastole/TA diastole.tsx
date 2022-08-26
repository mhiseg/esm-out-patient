import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../registration-patient/patient-form/patient-registration/input/basic-input/input/input.component';
import styles from '../field.scss';

interface TaDiastoleComponentProps {
    name: string,
    className?: string
    required?: boolean
}
export const TaDiastoleComponent: React.FC<TaDiastoleComponentProps> = ({ name,required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    return (
        <>
            <Input
                type="number"
                className={styles.margin_field}
                id="TaDiastole"
                name={name}
                labelText={""}
                light={true}
                placeholder={t('TaDiastole')+ star}
            />
        </>
    );
};


