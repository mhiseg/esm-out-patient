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
                title={t("validationModal", "Terminer Consultation")}
                body={t("messageModalValidation", "Vous êtes sur le point de stopper la consultation de " + patientName + ". Voulez-vous continuer?")}
                primaryButtonName={t("confirmModalButton", "Terminer")}
                secondaryButtonName={t("cancelButton", "Annuler")}
                modalType="confirmation"
            />
        </>
    );
}