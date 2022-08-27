import styles from "./relationShipCard.scss";
import React from "react";
import { Icon } from "@iconify/react";

const RelationShipCard = ({
  relationshipName,
  relationshipType,
  relationshipPhone,
}) => {
  return (
    relationshipName != null &&
    relationshipName !== undefined && (
      <p>
        <span> {relationshipName} </span>
        {relationshipPhone != "" && relationshipPhone !== null && (
          <span>
            <Icon
              className={styles.relationshipPhoneIcon}
              icon="bxs:phone-call"
            />{" "}
            <span>{relationshipPhone}</span>{" "}
          </span>
        )}
        <span className={styles.relationShipType}> {relationshipType} </span>
      </p>
    )
  );
};
export default RelationShipCard;
