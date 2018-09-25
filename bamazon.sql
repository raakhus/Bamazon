DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quanity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quanity)
VALUES
	("broom", 'home supplies', 20, 100),
	("watch", 'jewelry', 200, 5),
	("pot", 'home supplies', 20, 50),
    ("bottle", 'daily use', 5, 1000),
    ("t-shirt", 'clothing', 15, 2000),
    ("printer", 'office supplies', 200, 10),
    ("ink", 'office supplies', 99999, 2),
    ("TV", 'electronics', 400, 10),
    ("PC", 'electronics', 1000, 5),
    ("fan", 'home supplies', 50, 70),
    ("drill", 'DIY', 200, 3);
