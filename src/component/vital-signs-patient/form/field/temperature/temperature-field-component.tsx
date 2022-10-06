import React, { } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../registration-patient/patient-form/input/basic-input/input/input.component';


interface InputProps {
    className?: string;
    value?: string;
    required?: boolean;
}

export const TemperatureField: React.FC<InputProps> = ({ required, className }) => {
    const { t } = useTranslation();
    let star = "";
    required == true ? star = " *" : star = "";
    
    return (
        <>
            <Input
                className={className}
                id={"temp"}
                name={"temp"}
                type="number"
                labelText={t("temperature") + star}
                light={true}
                placeholder={t('temperature') + ' °C' + star}
                hideLabel={true}
            />
        </>
    );
};


