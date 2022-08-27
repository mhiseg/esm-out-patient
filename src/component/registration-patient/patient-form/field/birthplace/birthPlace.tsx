import { ChartMultitype16 } from "@carbon/icons-react";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Autosuggest } from "../../input/custom-input/autosuggest/autosuggest.component";
import { PatientRegistrationContext } from "../../patient-registration-context";
import { useField } from "formik";
import { Address } from "../../../../resources/types";
import { formatAddress } from "../../../../resources/patient-resources";

interface BirthPlaceProps {
    places?: Address[];
    className?: string;
}

const BirthPlace: React.FC<BirthPlaceProps> = ({ places }) => {
    const { t } = useTranslation();
    const [field, meta] = useField('birthPlace');
    const { setFieldValue } = useContext(PatientRegistrationContext);
    const search = async (query: string) => {
        return places.filter(place => place.cityVillage.toUpperCase().includes(query.toUpperCase()) || place.stateProvince.toUpperCase().includes(query.toUpperCase()))
    };
    
    return (
        <>
            <Autosuggest
                {...field}
                name="birthPlace"
                placeholder={t("birthPlaceLabelText", "Lieu de naissance")}
                onSuggestionSelected={(field: string, selectedSuggestion: string) => {
                    setFieldValue(field, selectedSuggestion);
                }}
                value={formatAddress(meta.value)?.display}
                getSearchResults={search}
                getDisplayValue={item => item.display}
                getFieldValue={item => item}
            />
        </>
    );
};

export default BirthPlace;

