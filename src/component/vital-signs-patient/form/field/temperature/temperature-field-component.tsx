import React, { useEffect } from 'react';
import styles from './../field.scss';
import { useTranslation } from 'react-i18next';
import { InputObs } from '../../../../registration-patient/patient-form/input/custom-input/custom-input/input.component-obs';
import { Column, Row } from 'carbon-components-react';
import { useField } from 'formik';
import { TemperatureCelcField } from './temperature-celcius-field-component';
import { TemperatureFahField } from './temperature-fahrenheit-field-component';


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


