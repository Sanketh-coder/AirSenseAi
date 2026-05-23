package com.weather.entity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name = "WeatherTest")
public class WeatherTest {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
	
	 @Column(name = "temp")
	private String  temp;
	 
	 @Column(name = "gas")
	private String  gas;
	 
	 @Column(name = "hum")
		private String  hum;
	 
	 
	 
	 @Column(name = "wid")
		private long   wid;
	 
	 
	 
	 

	public long getId() {
		return id;
	}

	public String getTemp() {
		return temp;
	}

	public String getHum() {
		return hum;
	}

	public long getWid() {
		return wid;
	}

	public void setId(long id) {
		this.id = id;
	}

	public void setTemp(String temp) {
		this.temp = temp;
	}

	public void setHum(String hum) {
		this.hum = hum;
	}

	public void setWid(long wid) {
		this.wid = wid;
	}

	public String getGas() {
		return gas;
	}

	public void setGas(String gas) {
		this.gas = gas;
	}

	@Override
	public String toString() {
		return "WeatherTest [id=" + id + ", temp=" + temp + ", gas=" + gas + ", hum=" + hum + ", wid=" + wid
				+ ", getId()=" + getId() + ", getTemp()=" + getTemp() + ", getHum()=" + getHum() + ", getWid()="
				+ getWid() + ", getGas()=" + getGas() + "]";
	}

	

}
