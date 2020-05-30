package es.mesacarlos.webconsole.util;

import java.io.UnsupportedEncodingException;
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
		msg = correctEncoding(msg);
		return msg;
	}
	
	/**
	 * Java i18n uses ISO-8859-1 internally, so we need to correct all characters to UTF-8
	 * @param msg Message to correct
	 * @return Message corrected
	 */
	private static String correctEncoding(String msg) {
		try {
			msg = new String(msg.getBytes("ISO-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return msg;
	}
	
	/**
	 * getPhrase() method expects all params to be ISO-8859-1.
	 * This method will be used when a UTF-8 String is given and you need to use it as a parameter for the above mentioned function.
	 * 
	 * @return The same String encoded ISO-8859-1
	 */
	public static String utf8ToIso(String msg) {
		try {
			msg = new String(msg.getBytes("UTF-8"), "ISO-8859-1");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return msg;
	}
	
}