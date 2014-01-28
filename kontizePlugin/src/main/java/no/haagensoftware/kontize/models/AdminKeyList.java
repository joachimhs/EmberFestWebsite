package no.haagensoftware.kontize.models;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by jhsmbp on 1/27/14.
 */
public class AdminKeyList {
    private List<AdminKey> adminKeys;

    public AdminKeyList() {
        adminKeys = new ArrayList<>();
    }

    public List<AdminKey> getAdminKeys() {
        return adminKeys;
    }

    public void setAdminKeys(List<AdminKey> adminKeys) {
        this.adminKeys = adminKeys;
    }
}
