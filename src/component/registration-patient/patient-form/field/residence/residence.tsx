import { Row, Column } from "carbon-components-react";
import { useField } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { formatAddress } from "../../../../resources/patient-resources";
import { Address } from "../../../../resources/types";
import { Autosuggest } from "../../input/custom-input/autosuggest/autosuggest.component";
import { PatientRegistrationContext } from "../../patient-registration-context";
import { AddressField } from "../address/address-field.component";
import styles from '../field.scss';


interface ResidenceProps {
    places?: Address[];
    className?: string;
}
const ResidenceField: React.FC<ResidenceProps> = ({ className, places }) => {
    const { t } = useTranslation();
    const [field, meta] = useField('residence');
    const [addressField, addressMeta] = useField('residence.address1');
    const value = formatAddress(meta.value);
    const { setFieldValue } = useContext(PatientRegistrationContext);
    const search = async (query: string) => {
        return places.filter(place => place.cityVillage.toUpperCase().includes(query.toUpperCase()) || place.stateProvince.toUpperCase().includes(query.toUpperCase()))
    };

    return (
        <>
            <Row>
                <Column>
                    <Autosuggest
                        {...field}
                        name="residence"
                        placeholder={t("residenceLabelText", "Domicile")}
                        onSuggestionSelected={(field: string, selectedSuggestion: string) => {
                            setFieldValue(field, selectedSuggestion);
                            setFieldValue("residence.address1", addressMeta.value);
                        }}
                        value={formatAddress(meta.value)?.display}
                        getSearchResults={search}
                        getDisplayValue={item => item.display}
                        getFieldValue={item => item}
                    />
                    {meta.error && (
                        <div className={styles.fieldError}>{t("messageErrorResidence", 'Ce champs ne peut pas etre vide')}</div>
                    )}
                </Column>
                <Column>
                    <AddressField value={formatAddress(meta.value)?.address1} name="residence.address1" className={styles.margin_field} />
                </Column>
            </Row>
        </>
    );
};

export default ResidenceField;
