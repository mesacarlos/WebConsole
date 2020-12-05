package es.mesacarlos.webconsole.util;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JsonUtils {
	/*{
	  "command": "LOGIN",
	  "token": "aosduhasiudgasuidgasdgaspid",
	  "params": ""
	}*/
	public final static String COMMAND_PROPERTY = "command";
	public final static String TOKEN_PROPERTY = "token";
	public final static String PARAMS_PROPERTY = "params";
	
	/**
	 * Check that a given String is a valid JSON
	 * @param Json JSON to check
	 * @return true if it is a valid JSON, false otherwise
	 */
	public static boolean isValidJson(String Json) {
	    Gson gson = new Gson();
	    try {
	        gson.fromJson(Json, Object.class);
	        Object jsonObjType = gson.fromJson(Json, Object.class).getClass();
	        if(jsonObjType.equals(String.class)){
	            return false;
	        }
	        return true;
	    } catch (com.google.gson.JsonSyntaxException ex) {
	        return false;
	    }
	}
	
	/**
	 * Check that a given JSON contains some property
	 * @param JsonString JSON to check
	 * @param property property to check
	 * @return true if the JSON string contains that property, false otherwise
	 */
	public static boolean containsProperty(String JsonString, String property) {
		if(!isValidJson(JsonString))
			return false;
		
		JsonParser parser = new JsonParser();
		JsonObject obj = parser.parse(JsonString).getAsJsonObject();
		JsonElement elem = obj.get(property);
		if(elem == null)
			return false;
		return true;
	}
	
	/**
	 * Check that a given JSON contains some property, and its type is a String
	 * @param JsonString JSON to check
	 * @param property property to check
	 * @returntrue if the JSON string contains that property and it is a String, false otherwise
	 */
	public static boolean containsStringProperty(String JsonString, String property) {
		if(!isValidJson(JsonString))
			return false;
		
		JsonParser parser = new JsonParser();
		JsonObject obj = parser.parse(JsonString).getAsJsonObject();
		JsonElement elem = obj.get(property);
		if(elem == null)
			return false;
		try {
			elem.getAsString();
			return true;
		}catch(Exception e) {
			return false;
		}
	}
	
	/**
	 * Get a String property from a JSON
	 * @param JsonString JSON to check
	 * @param property property to extract from JSON string
	 * @return the value for that property. If the property is not set, an empty string will be returned
	 */
	public static String getStringProperty(String JsonString, String property) {
		JsonParser parser = new JsonParser();
		JsonObject obj = parser.parse(JsonString).getAsJsonObject();
		JsonElement result = obj.get(property);
		if(result != null)
			return result.getAsString();
		return "";
	}
	
}