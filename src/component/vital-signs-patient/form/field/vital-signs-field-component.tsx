import React from 'react';
import { CardiacFrequencyField } from './cardiac-frequency/cardiac-frequency-field-component';
import { DiastoleField } from './diastole/diastole-field-component';
import styles from './field/field.scss';
import { FrequencyRateField } from './frespiratory-rate/frequency-rate-component';
import { MobilityField } from './mobility/mobility-field-component';
import { NeuroField } from './neuro/neuro-field-component';
import { SystoleField } from './systole/systole-field-component';
import { TemperatureField } from './temperature/temperature-field-component';
import { TraumaField } from './trauma/trauma-field-component';

const VitalForm = (name: string, value?) => {
  switch (name) {
    case 'mobility':
      return <MobilityField/>;
    case 'respiratoryRate':
      return <FrequencyRateField />
    case 'cardiacFrequency':
      return <CardiacFrequencyField />
    case 'systole':
      return <SystoleField />
    case 'diastole':
      return <DiastoleField />
    case 'neuro':
      return <NeuroField />
    case 'temperature':
      return <TemperatureField />
    case 'trauma':
      return <TraumaField />
    default:
      return null
  }
}

export default VitalForm;
