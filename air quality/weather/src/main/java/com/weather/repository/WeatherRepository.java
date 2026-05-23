package com.weather.repository;
import com.weather.entity.WeatherTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WeatherRepository extends JpaRepository<WeatherTest, Long> {

	WeatherTest findByWid(Long mynewid);
	//Optional  <Waterlevel>  findById(Long id);
		//Waterlevel findByWid(Long wid);
	}