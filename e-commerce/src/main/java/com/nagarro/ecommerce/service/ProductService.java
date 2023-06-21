package com.nagarro.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nagarro.ecommerce.dao.ProductDao;
import com.nagarro.ecommerce.entity.Product;

@Service
public class ProductService {
	
	@Autowired
	private ProductDao productDao;

	public Product addNewProduct(Product product) {
		return productDao.save(product);
		
	}
	
	public List<Product> getAllProducts(){
		return (List<Product>) productDao.findAll();
	}
}
