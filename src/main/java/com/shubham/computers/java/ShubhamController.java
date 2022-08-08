package com.shubham.computers.java;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShubhamController {

	@GetMapping("/hello")
	public String getComps() {
		return "Hello Mayu";
	}

}
