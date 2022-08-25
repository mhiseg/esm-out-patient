import React, { useContext, useEffect, useState } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'carbon-components-react';
import { useField } from 'formik';


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

export const TAdiastoleComponent: React.FC<InputProps> = (props) => {
    const [field, meta, helpers] = useField(props.name);
    const { value } = meta;
    const { setValue } = helpers;
    const { t } = useTranslation();
    const handleChange = (e, value) => {
        setValue((e.target.value) === undefined ? '' : (e.target.value))
    }

    return (
        <div className={styles.margin_field}>
            <TextInput
                type="number"
                labelText=""
                placeholder={t('TaDiastole')}
                {...props}
                {...field}
                invalid={!!(meta.touched && meta.error)}
                invalidText={meta.error}
                onChange={(e) => {
                    const { value } = e.target;
                    handleChange(e, value)
                }}
                light={true}
                value={props.prefix + " " + field.value || ''}
            />
        </div>
    );
};
