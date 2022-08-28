import React, { useEffect } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { InputObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-input/input.component-obs';
import { Column, Row, TextInput } from 'carbon-components-react';
import { useField } from 'formik';


interface InputProps {
    required?: boolean;
    value?: number;
}

export const TemperatureFahField: React.FC<InputProps> = ({ required, value }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    const [fieldTemp, metaTemp] = useField("temp");
    const [field, meta, helpers] = useField("tempF");
    const { setValue } = helpers;

    useEffect(() => {
        setValue(metaTemp.value);
    }, [metaTemp.value]);

    return (
        <>
            <TextInput
                {...field}
                type="number"
                className={styles.margin_field}
                id="temp"
                name="tempF"
                labelText={""}
                invalid={!!(meta.error && meta.touched)}
                invalidText={t(meta.error)}
                size="lg"
                placeholder={t('temperature') + ' °F' + star}
                light={true}
            />

        </>
    );
};


