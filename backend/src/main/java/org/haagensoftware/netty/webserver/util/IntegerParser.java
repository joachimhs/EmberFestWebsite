package org.haagensoftware.netty.webserver.util;

public class IntegerParser {

	public static Integer parseIntegerFromString(String input, Integer fallbackValue) {
		Integer retInt = null;
		
		try {
			if (input != null) {
				retInt = Integer.parseInt(input.trim());
			} else {
				retInt = fallbackValue;
			}
		} catch (NumberFormatException nfe) {
			retInt = fallbackValue;
		}
		
		return retInt;
	}
}
