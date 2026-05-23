package com.weather.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.*;

import javax.servlet.http.HttpSession;

import com.weather.repository.WeatherRepository;

import com.weather.entity.WeatherTest;
@Controller
public class WeatherController {
	@Autowired
	private WeatherRepository wrepo;
	
	@GetMapping("weatherapp/{temp1}/{hum1}/{gas}")
	public String registerForm(@PathVariable("temp1")String   temp1, @PathVariable("hum1")String  hum1,@PathVariable("gas")String  gas )
	{
		int myid=1;
		Long mynewid=(long)myid;
		WeatherTest WeatherTest=wrepo.findByWid(mynewid);

		if(WeatherTest == null)
		{
		    WeatherTest = new WeatherTest();
		}

		System.out.println(WeatherTest.getWid());
		System.out.println(WeatherTest.getTemp());
		System.out.println(WeatherTest.getHum());
		System.out.println(WeatherTest.getGas());
		 
		 WeatherTest.setWid(myid);
		 WeatherTest.setTemp(temp1);
		 WeatherTest.setHum(hum1);
		 WeatherTest.setGas(gas);
		 
		 
		 wrepo.save(WeatherTest);
		 return"/weather";
	}
	
	
	
	@GetMapping("/")
	public String home(Model model,@ModelAttribute("WeatherTest")WeatherTest WeatherTest)
	{
		int myid=1;
		Long mynewid=(long)myid;


		 WeatherTest=wrepo.findByWid(mynewid);

		 if(WeatherTest != null)
		 {
		     System.out.println(WeatherTest.getWid());
		     System.out.println(WeatherTest.getTemp());
		     System.out.println(WeatherTest.getHum());
		     System.out.println(WeatherTest.getGas());
		 }
		 
		 String T="0";
		 String H="0";

		 if(WeatherTest != null)
		 {
		     T=WeatherTest.getTemp();
		     H=WeatherTest.getHum();
		 }
		 
		 
		 
		 model.addAttribute("WeatherTest",WeatherTest);
		 
		 String g="0";

		 if(WeatherTest != null)
		 {
		     g=WeatherTest.getGas();
		 }
	
	int gas=Integer.parseInt(g);
		 model.addAttribute("WeatherTest",WeatherTest);
		 model.addAttribute("gas",gas);
		 
		 
		//model.addAttribute("T",T);
		//model.addAttribute("H",H);

				
		return "/index";
	}

}
