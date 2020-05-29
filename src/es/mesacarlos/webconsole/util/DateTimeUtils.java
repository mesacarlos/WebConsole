package es.mesacarlos.webconsole.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeUtils {
	public static String getDateAsString() {
		return new SimpleDateFormat("dd-MM-yyyy HH:mm:ss").format(new Date());
	}
	
	public static String getTimeAsString() {
		return new SimpleDateFormat("HH:mm:ss").format(new Date());
	}
}