import React, { useEffect } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { InputObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-input/input.component-obs';
import { Column, Row, TextInput } from 'carbon-components-react';
import { useField } from 'formik';


interface InputProps {
    required?: boolean;
}

export const TemperatureCelcField: React.FC<InputProps> = ({ required }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    const [field, meta, helpers] = useField("temp");
    const { setValue } = helpers;

    return (
        <div className={styles.margin_field}>
            <TextInput
                {...field}
                className={styles.font}
                type="number"
                id="temp"
                name="temp"
                labelText={""}
                invalid={!!(meta.error && meta.touched)}
                invalidText={t(meta.error)}
                placeholder={t('temperature') + ' °C' + star}
                size="lg"
                light={true}
            />
           
        </div>
    );
};


