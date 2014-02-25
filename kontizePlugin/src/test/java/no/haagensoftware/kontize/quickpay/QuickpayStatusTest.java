package no.haagensoftware.kontize.quickpay;

import junit.framework.Assert;
import org.junit.Test;

/**
 * Created by jhsmbp on 25/02/14.
 */
public class QuickpayStatusTest {

    @Test
    public void verifyStatusCode() {
        Assert.assertTrue(QuickpayStatus.fromString("000") == QuickpayStatus.approved);
        Assert.assertTrue(QuickpayStatus.fromString("001") == QuickpayStatus.rejectedByAcquirer);
        Assert.assertTrue(QuickpayStatus.fromString("002") == QuickpayStatus.communicationError);
        Assert.assertTrue(QuickpayStatus.fromString("003") == QuickpayStatus.cardExpired);
        Assert.assertTrue(QuickpayStatus.fromString("004") == QuickpayStatus.transitionNotAllowed);
        Assert.assertTrue(QuickpayStatus.fromString("005") == QuickpayStatus.authorizationExpired);
        Assert.assertTrue(QuickpayStatus.fromString("006") == QuickpayStatus.errorFromAcquirer);
        Assert.assertTrue(QuickpayStatus.fromString("007") == QuickpayStatus.errorFromQuickpay);
        Assert.assertTrue(QuickpayStatus.fromString("008") == QuickpayStatus.errorInRequestData);
        Assert.assertTrue(QuickpayStatus.fromString("009") == QuickpayStatus.aborted);

        System.out.println(QuickpayStatus.fromString("000").toString());
    }
}
