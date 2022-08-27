import React, { useContext, useEffect, useState } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'carbon-components-react';
import { useField } from 'formik';
import { Input } from '../../../../registration-patient/patient-form/input/basic-input/input/input.component';


interface InputProps {
    required?: boolean
}
export const DiastoleField: React.FC<InputProps> = ({ required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    return (
        <div className={styles.margin_field}>
            <Input
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

