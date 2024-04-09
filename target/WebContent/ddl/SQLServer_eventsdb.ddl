DROP
DATABASE IF EXISTS events;

DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS payMethod;
DROP TABLE IF EXISTS orderevent;
DROP TABLE IF EXISTS ordersummary;
DROP TABLE IF EXISTS incart;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS customer;

CREATE
DATABASE events;
USE
events;

CREATE TABLE customer
(
    customerId INT IDENTITY PRIMARY KEY,
    firstName  VARCHAR(40),
    lastName   VARCHAR(40),
    email      VARCHAR(50) NOT NULL UNIQUE,
    phonenum   VARCHAR(20) NOT NULL UNIQUE,
    address    VARCHAR(50),
    city       VARCHAR(40),
    province   VARCHAR(20),
    postalCode VARCHAR(20),
    country    VARCHAR(40),
    userId     VARCHAR(20) NOT NULL UNIQUE,
    password   VARCHAR(30),
    isHolder   BIT,
    UNIQUE (firstName, lastName) -- Composite unique constraint
);
CREATE INDEX idx_customer_userId ON customer (userId);



CREATE TABLE event
(
    eventId       INT IDENTITY ,
    eventName     VARCHAR(255) NOT NULL UNIQUE,
    eventCategory VARCHAR(50),
    eventDesc     VARCHAR(2048),
    eventDate     VARCHAR(10)  NOT NULL,
    startTime     TIME         NOT NULL,
    endTime       TIME         NOT NULL,
    address       VARCHAR(255) NOT NULL,
    totalTicket   INT,
    ticketNum     INT,
    ticketPrice   DECIMAL(10, 2),
    eventRating   INT,
    PRIMARY KEY (eventId)
);


CREATE TABLE incart
(
    customerId  INT,
    eventId     INT,
    ticketPrice DECIMAL(10, 2),
    ticketNum   INT,
    isSelected  BIT,
    PRIMARY KEY (CustomerId, eventId)
);


CREATE TABLE ordersummary
(
    orderId     INT IDENTITY ,
    orderDate   DATETIME  NOT NULL ,
    totalAmount DECIMAL(10, 2)  NOT NULL ,
    email       VARCHAR(20) NOT NULL ,
	phonenum    VARCHAR(20) NOT NULL ,
    customerId  INT 	NOT NULL ,
	payMethodId INT		NOT NULL ,
    PRIMARY KEY (orderId)
);

CREATE TABLE orderevent
(
    orderId     INT		NOT NULL ,
    eventId     INT		NOT NULL ,
    TicketPrice DECIMAL(10, 2) NOT NULL ,
    TicketNum   INT	NOT NULL ,
    PRIMARY KEY (orderId, eventId),
);

CREATE TABLE payMethod
(
    payMethodId         INT IDENTITY PRIMARY KEY,
	customerId          INT,
	payeeName			VARCHAR(20),	
    payMethodType       VARCHAR(20),
    payMethodNumber     VARCHAR(30),
    expireDate DATE,
	UNIQUE (customerId, payMethodType) -- Composite unique constraint
);


CREATE TABLE review
(
    reviewId      INT IDENTITY,
    orderId       INT,
    eventId       INT,
    reviewRating  INT,
    reviewDate    DATETIME,
    customerId    INT,
    reviewComment VARCHAR(1000),
    PRIMARY KEY (reviewId),
    UNIQUE (orderId, eventId) -- Composite unique constraint
);
