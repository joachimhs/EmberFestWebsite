package no.haagensoftware.kontize.quickpay;

/**
 * Created by jhsmbp on 25/02/14.
 */
public enum QuickpayStatus {
    approved("000", "Approved"),
    rejectedByAcquirer("001", "Rejected by acquirer"),
    communicationError("002", "Communication error"),
    cardExpired("003", "Card expired"),
    transitionNotAllowed("004", "Transition is not allowed for transaction current state"),
    authorizationExpired("005", "Authorization is expired"),
    errorFromAcquirer("006", "Error reported by acquirer"),
    errorFromQuickpay("007", "Error reported by QuickPay"),
    errorInRequestData("008", "Error in request data"),
    aborted("009", "Payment aborted by shopper");

    private String statuscode;
    private String statusmessage;

    QuickpayStatus(String statuscode, String statusmessage) {
        this.statuscode = statuscode;
        this.statusmessage = statusmessage;
    }

    public String getStatusCode() {
        return statuscode;
    }

    public String getStatusmessage() {
        return statusmessage;
    }

    public static QuickpayStatus fromString(String statuscode) {
        if (statuscode != null) {
            for (QuickpayStatus status : QuickpayStatus.values()) {
                if (status.getStatusCode().equals(statuscode)) {
                    return status;
                }
            }
        }

        return null;
    }
}
