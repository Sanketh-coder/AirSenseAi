package com.weather.entity;

import javax.persistence.*; 
@Entity 

@Table(name="pollution_history")

public class PollutionHistory {
	
	@Id 
	
	@GeneratedValue(strategy= GenerationType.IDENTITY) 
	
	private int id; 
	
	private String temperature; 
	
	private String humidity; 
	
	private String gas; 
	
	private String dayName; 
	
	private String dateValue; 
	
	private String timeValue; 
	
	public int getId() { 
		return id; 
		} 
	
	public void setId(int id) { 
		this.id = id; 
		} 
	
	public String getTemperature() { 
		return temperature; 
		} 
	
	public void setTemperature(String temperature) { 
		this.temperature = temperature; 
		} 
	
	public String getHumidity() { 
		return humidity; 
		} 
	
	public void setHumidity(String humidity) { 
		this.humidity = humidity; 
		} 
	
	public String getGas() { 
		return gas; 
		} 
	
	public void setGas(String gas) { 
		this.gas = gas; 
		} 
	
	public String getDayName() { 
		return dayName; 
		} 
	
	public void setDayName(String dayName) { 
		this.dayName = dayName; 
		} 
	
	public String getDateValue() { 
		return dateValue; 
		} 
	
	public void setDateValue(String dateValue) { 
		this.dateValue = dateValue; 
		} 
	
	public String getTimeValue() { 
		return timeValue; 
		} 
	
	public void setTimeValue(String timeValue) { 
		this.timeValue = timeValue; 
		}

}
