import React, { useContext, useEffect, useState } from 'react';
import styles from '../field.scss';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'carbon-components-react';
import { useField } from 'formik';
import { SelectInput } from '../../../registration-patient/patient-form/patient-registration/input/basic-input/select/select-input.component';


interface InputProps {
    id: string;
    name: string;
    disabled?: boolean;
    placeholder?: string;
    required?: boolean;
    prefix?: string;
    className?: string;
    value?: string;
}

export const TraumaComponent: React.FC<InputProps> = (props) => {
    const [field, meta, helpers] = useField(props.name);
    const [answers, setAnswers] = useState([])
    const [question, setQuestion] = useState("Mobilite");
    const { setValue } = helpers;
    const { t } = useTranslation();
    const handleChange = (e, value) => {
        setValue((e.target.value) === undefined ? '' : (e.target.value))
    }

    return (
        <div className={styles.margin_field}>
            <SelectInput
                options={[...answers]}
                label={t('Select') + ' ' + question}
                name="Mobilite"
            />
        </div>
    );
};
