import React from "react";
import { Column, Row } from "carbon-components-react";
import styles from "./patient-card.scss";
import { Icon } from "@iconify/react";

export default function FormatCardCell({ icon, label }) {
  return (
    <>
      {label !== "" && label !== undefined && label != null && (
        <>
          <Column className={styles.column}>
            <span>
              <Icon icon={icon} className={styles.icon} />
              <span className={styles.iconLabel}>{label}</span>
            </span>
          </Column>
        </>
      )}
    </>
  );
}
