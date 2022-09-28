import { Column, Row } from "carbon-components-react";
import React from "react";
import { useTranslation } from "react-i18next";
import FormatCardCell from "./patient-cardCell";
import RelationShipCard from "../relationShipCard/relationShiphCard";




const CardBody =({patient}) => {
    const { t } = useTranslation();
    const formatPhoneNumber = (phoneNumberString) => (phoneNumberString?.replace(/\D/g, "").match(/.{1,4}/g)?.join("-").substr(0, 9) || "");

    return (
        <>
           <Row>
                <Column lg={4}>
                  <FormatCardCell
                    icon="cil:calendar"
                    label={patient.birth}
                  />

                  <FormatCardCell
                    icon="ion:home-outline"
                    label={patient.residence}
                  />
                  <FormatCardCell
                    icon="healthicons:city-outline"
                    label={patient.habitat}
                  />
                </Column>

                <Column lg={3}>
                  <FormatCardCell
                    icon="teenyicons:id-outline"
                    label={patient.identify}
                  />

                  <FormatCardCell
                    icon="carbon:user-multiple"
                    label={patient.matrimonial}
                  />

                  <FormatCardCell
                    icon="ic:baseline-work-outline"
                    label={patient.occupation}
                  />
                </Column>

                <Column lg={5}>
                  <FormatCardCell
                    icon="carbon:phone"
                    label={"(+509) " + formatPhoneNumber(patient.phoneNumber) || ""}
                  />
                  <FormatCardCell
                    icon="bytesize:location"
                    label={patient.birthplace}
                  />
                  <FormatCardCell
                    icon="akar-icons:link-chain"
                    label={
                      patient.relationship[0] != "" &&
                        patient.relationship[0] != null ? (
                        <RelationShipCard
                          relationshipName={patient.relationship[0]}
                          relationshipType={patient.relationship[1]}
                          relationshipPhone={"(+509) " + formatPhoneNumber(patient.relationship[2].toString()) || ""}
                        />
                      ) : null
                    }
                  />
                </Column>
              </Row>    
        </>
    );
}

export default CardBody;