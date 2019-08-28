package com.mesacarlos.webconsole.util;

import java.text.MessageFormat;
import java.util.Locale;
import java.util.ResourceBundle;

public class Internationalization {
	private static ResourceBundle messages = ResourceBundle.getBundle("phrases", new Locale("en"));
	
	/**
	 * Changes locale of this application
	 * @param locale String representing language 
	 */
	public static void setCurrentLocale(String locale) {
		messages = ResourceBundle.getBundle("phrases", new Locale(locale));
	}
	
	/**
	 * Get current locale
	 * @return Current locale
	 */
	public static Locale getCurrentLocale() {
		return messages.getLocale();
	}

	/**
	 * Gets translated message
	 * @return The desired message in user's language
	 */
	public static String getPhrase(String phrase, Object... params) {
		String msg = messages.getString(phrase);
		msg = MessageFormat.format(msg, params);
		return msg;
	}
}