import React, { } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { TemperatureCelcField } from './temperature-celcius-field-component';


interface InputProps {
    className?: string;
    value?: string;
    required?: boolean;
}

export const TemperatureField: React.FC<InputProps> = ({ required }) => {
    return (
        <>
            {/* <Row> */}
            {/* <Column> */}
            <TemperatureCelcField
                required={true}
            />
            {/* </Column> */}
            {/* <Column>
                    <TemperatureFahField
                        required={true}
                        value={10}
                    />
                </Column> */}
            {/* </Row> */}
        </>
    );
};


