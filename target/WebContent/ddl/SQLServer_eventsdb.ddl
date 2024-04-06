CREATE DATABASE orders;
USE orders;

CREATE TABLE customer (
    customerId      INT IDENTITY,
    firstName       VARCHAR(40),
    lastName        VARCHAR(40),
    email           VARCHAR(50),
    phonenum        VARCHAR(20),
    address         VARCHAR(50),
    city            VARCHAR(40),
    state           VARCHAR(20),
    postalCode      VARCHAR(20),
    country         VARCHAR(40),
    userid          VARCHAR(20),
    password        VARCHAR(30),
    isHolder        BIT,
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
    eventId         INT IDENTITY,
    EventName       VARCHAR(255) NOT NULL,
    EventDate       DATE NOT NULL,
    StartTime       DATE NOT NULL,
    EndTime         DATE NOT NULL,
    Address         VARCHAR(255) NOT NULL,
    TotalTicket     INT,
    TicketNum       INT,
    TicketPrice     DECIMAL(10,2),
    PRIMARY KEY (eventId)
);

CREATE TABLE orderevent (
orderId INT,
eventId INT,
ticketQuantity INT,
price DECIMAL(10,2),
PRIMARY KEY (orderId, eventId),
FOREIGN KEY (orderId) REFERENCES ordersummary(orderId)
ON UPDATE CASCADE ON DELETE NO ACTION,
FOREIGN KEY (eventId) REFERENCES product(eventId)
ON UPDATE CASCADE ON DELETE NO ACTION
);

CREATE TABLE incart (
customerId INT,
eventId INT,
quantity INT,
price DECIMAL(10,2),
isSelected BIT,
PRIMARY KEY (customerId, eventId),
FOREIGN KEY (customerId) REFERENCES customer(customerId)
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