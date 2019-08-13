package com.mesacarlos.webconsole.json;

import com.google.gson.JsonObject;

public class RamUsage implements JSONOutput {
	private String message;
	private int free;
	private int used;
	private int max;

	public RamUsage(String message, int free, int used, int max) {
		this.message = message;
		this.free = free;
		this.used = used;
		this.max = max;
	}

	@Override
	public int getStatusCode() {
		return 1002;
	}

	@Override
	public String getMessage() {
		return message;
	}
	
	/**
	 * Free amount of RAM, in MB
	 * @return
	 */
	public int getFree() {
		return free;
	}
	
	/**
	 * Used amount of RAM, in MB
	 * @return
	 */
	public int getUsed() {
		return used;
	}
	
	/**
	 * Max amount of RAM, in MB
	 * @return
	 */
	public int getMax() {
		return max;
	}

	@Override
	public String toJSON() {
		JsonObject object = new JsonObject();
		object.addProperty("status", getStatusCode());
		object.addProperty("statusDescription", "RAM Usage");
		object.addProperty("free", getFree());
		object.addProperty("total", getUsed());
		object.addProperty("max", getMax());
		object.addProperty("message", getMessage());
		return object.toString();
	}

}