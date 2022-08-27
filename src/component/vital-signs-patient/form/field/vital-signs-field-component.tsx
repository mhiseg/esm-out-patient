import React from 'react';
import { CardiacFrequencyField } from './cardiac-frequency/cardiac-frequency-field-component';
import { DiastoleField } from './diastole/diastole-field-component';
import { FrequencyRateField } from './frespiratory-rate/frequency-rate-component';
import { MobilityField } from './mobility/mobility-field-component';
import { NeuroField } from './neuro/neuro-field-component';
import { SystoleField } from './systole/systole-field-component';
import { TemperatureField } from './temperature/temperature-field-component';
import { TraumaField } from './trauma/trauma-field-component';

const VitalForm = (name: string) => {
  switch (name) {
    case 'mobility':
      return <MobilityField/>;
    case 'respiratoryRate':
      return <FrequencyRateField required={true}/>
    case 'cardiacFrequency':
      return <CardiacFrequencyField required={true}/>
    case 'systole':
      return <SystoleField required={true}/>
    case 'diastole':
      return <DiastoleField required={true}/>
    case 'neuro':
      return <NeuroField />
    case 'temperature':
      return <TemperatureField required={true}/>
    case 'trauma':
      return <TraumaField />
    default:
      return null
  }
}

export default VitalForm;
