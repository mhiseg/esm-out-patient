import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../registration-patient/patient-form/patient-registration/input/basic-input/input/input.component';
import styles from '../field.scss';

interface TaSystoleComponentProps {
    name: string,
    className?: string
    required?: boolean
}
export const TaSystoleComponent: React.FC<TaSystoleComponentProps> = ({ name,required }) => {
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
                placeholder={t('TaSystole')+ star}
                hideLabel={true}
            />
        </>
    );
};


