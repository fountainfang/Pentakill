CREATE DATABASE orders;
USE orders;

CREATE TABLE customer (
customerId INT IDENTITY,
firstName VARCHAR(40),
lastName VARCHAR(40),
email VARCHAR(50),
phonenum VARCHAR(20),
address VARCHAR(50),
city VARCHAR(40),
state VARCHAR(20),
postalCode VARCHAR(20),
country VARCHAR(40),
userid VARCHAR(20),
password VARCHAR(30),
PRIMARY KEY (customerId)
);

CREATE TABLE paymentmethod (
paymentMethodId INT IDENTITY,
paymentType VARCHAR(20),
paymentNumber VARCHAR(30),
paymentExpiryDate DATE,
customerId INT,
PRIMARY KEY (paymentMethodId),
FOREIGN KEY (customerId) REFERENCES customer(customerid)
ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE ordersummary (
orderId INT IDENTITY,
orderDate DATETIME,
totalAmount DECIMAL(10,2),
email VARCHAR(50),
customerId INT,
PRIMARY KEY (orderId),
FOREIGN KEY (customerId) REFERENCES customer(customerid)
ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE event (
EventID INT PRIMARY KEY,
EventName VARCHAR(255) NOT NULL,
EventDate DATE NOT NULL,
Address VARCHAR(255) NOT NULL,
SeatNum VARCHAR(10)
);

CREATE TABLE orderevent (
orderId INT,
eventId INT,
quantity INT,
price DECIMAL(10,2),
PRIMARY KEY (orderId, eventId),
FOREIGN KEY (orderId) REFERENCES ordersummary(orderId)
ON UPDATE CASCADE ON DELETE NO ACTION,
FOREIGN KEY (eventId) REFERENCES product(eventId)
ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE incart (
orderId INT,
eventId INT,
quantity INT,
price DECIMAL(10,2),
PRIMARY KEY (orderId, eventId),
FOREIGN KEY (orderId) REFERENCES ordersummary(orderId)
ON UPDATE CASCADE ON DELETE NO ACTION,
FOREIGN KEY (eventId) REFERENCES product(eventId)
ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE ticketinventory (
eventId INT,
quantity INT,
price DECIMAL(10,2),
PRIMARY KEY (eventId, warehouseId),
FOREIGN KEY (eventId) REFERENCES product(eventId)
ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE review (
reviewId INT IDENTITY,
reviewRating INT,
reviewDate DATETIME,
customerId INT,
eventId INT,
reviewComment VARCHAR(1000),
PRIMARY KEY (reviewId),
FOREIGN KEY (customerId) REFERENCES customer(customerId)
ON UPDATE CASCADE ON DELETE CASCADE,
FOREIGN KEY (eventId) REFERENCES product(eventId)
ON UPDATE CASCADE ON DELETE CASCADE
);