import React from 'react';
import { CardiacFrequencyField } from './cardiac-frequency/cardiac-frequency-field-component';
import { DiastoleField } from './diastole/diastole-field-component';
import { FrequencyRateField } from './respiratory-rate/frequency-rate-component';
import { MobilityField } from './mobility/mobility-field-component';
import { NeuroField } from './neuro/neuro-field-component';
import { SystoleField } from './systole/systole-field-component';
import { TemperatureField } from './temperature/temperature-field-component';
import { TraumaField } from './trauma/trauma-field-component';
import style from "./field.scss";

const VitalForm = (name: string, value?) => {
  switch (name) {
    case 'mobility':
      return <MobilityField value={value} />;
    case 'respiratoryRate':
      return <FrequencyRateField required={true} className={style.font}/>
    case 'cardiacFrequency':
      return <CardiacFrequencyField required={true} className={style.font}/>
    case 'systole':
      return <SystoleField required={true} className={style.font}/>
    case 'diastole':
      return <DiastoleField required={true} className={style.font}/>
    case 'neuro':
      return <NeuroField value={value} />
    case 'temperature':
      return <TemperatureField required={true} className={style.margin_field}/>
    case 'trauma':
      return <TraumaField  value={value}/>
    default:
      return null
  }
}

export default VitalForm;
