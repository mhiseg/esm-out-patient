import React from "react";
import { useTranslation } from "react-i18next";
import { BasicModal } from "../../widget/basic-modal/basic-modal";


export interface ConfirmationModalProps {
    confirmModal: any;
    closeModal: any;
    modalState: boolean;
    patientName: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ confirmModal, closeModal,modalState,patientName }) => {
    const { t } = useTranslation();

    return (
        <>
            <BasicModal
                onConfirmModal={confirmModal}
                state={modalState}
                onClose={closeModal}
                title={t("validationVisitModal", "Terminer Consultation")}
                body={t("messageModaVisit")+ patientName + t("messageModaVisitEnd",". Voulez-vous continuer?")}
                primaryButtonName={t("confirmModalButtonEndVisit", "Terminer")}
                secondaryButtonName={t("cancelButtonVisitCancelVisit", "Annuler")}
                modalType="confirmation"
            />
        </>
    );
}