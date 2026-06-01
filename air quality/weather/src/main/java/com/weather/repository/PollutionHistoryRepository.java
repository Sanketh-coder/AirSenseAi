package com.weather.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;

import com.weather.entity.PollutionHistory;

public interface PollutionHistoryRepository
extends JpaRepository<PollutionHistory,Integer>{

@Query(value =

"SELECT * FROM pollution_history GROUP BY day_name ORDER BY id DESC LIMIT 7",

nativeQuery = true)

List<PollutionHistory>
findTop7ByOrderByIdDesc();

}