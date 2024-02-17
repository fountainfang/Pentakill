# Pentakill Event Ticketing Platform

Welcome to the Pentakill Event Ticketing Platform - a web-based application for discovering, purchasing, and managing event tickets.

## Table of Contents
- [Introduction](#introduction)
- [User Requirements](#user-requirements)
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Use Case Diagram](#use-case-diagram)
- [User Stories](#user-stories)
- [Getting Started](#getting-started)
- [Feedback and Contributions](#feedback-and-contributions)
- [License](#license)

## Introduction
Our project introduces a web-based platform event ticket selling platform web application, aims to provide our users with the ability to select events and to purchase tickets online. Various events including concerts, performances, sports matches, and cultural gatherings will be categorized, with their information like address, date, ticket price, descriptions and so on. Event organizers will be able to add events and modify events. After that the system admin will be able to approve the modification and publish the result. Then our user can select an event they are interested in and purchase the ticket.
## User Requirements
Login/Logout: As a user, the customer would be able to log into the system by entering their
username and password. Only after logging in should the user be able to access the other
system functionalities. There will be an option to continue as guest, but a guest can only
view event info.

Rating/Commenting: Allow registered users to rate events they have attended. Ratings
provide valuable feedback for both event organizers and potential attendees.

Edit User Info: Registered users can log in to manage their profiles, update personal
information, email address, username, password and event preferences.

View Events Info: Everyone can browse the list of available events, filtering by categories,
dates, or locations.

Place Order: This use case represents the process of users purchasing event tickets through
the event ticketing system. Users will be able to place events into their carts, cancel their
orders and continue to the payment screen.

Manage Event: Event organizers can create new events, providing details such as
event name, date, location, and ticket types, and be able to decide the ticket price.

Monitor Activity: As the system admin, access to backend data will be available. The admin
will be able to open a portal to see stats of total sales, event stats, customer purchase
histories, etc.

Event Approval: After the organizer creates the event, the system administrator needs to be
able to verify the event and approve the publication of the event. Without approval, the end user cannot see the event online.

## Functional Requirements
User Authentication: The system must support user registration, login, and logout functionalities.
It should also allow browsing as a guest with limited access.

Event Management: Organizers can add, modify, and submit events for approval. Admins
have the capability to approve or reject these submissions.

Event Discovery: Users can view and search for events based on categories, dates, or
locations. The system should display event details, including address, date, ticket prices, and
descriptions.

Ticket Purchasing: Registered users can select events, add tickets to their cart, and proceed
through a secure payment process to purchase tickets.

User Profile Management: Users can edit their personal information, including email,
username, password, and event preferences.

Ratings and Comments: After attending events, users can leave ratings and comments to
provide feedback.

Activity Monitoring: Admins can access system analytics to monitor sales, event statistics,
and customer purchase histories.

## Non-Functional Requirements
Usability: The platform should be user-friendly, with an intuitive interface that makes it easy
for users to navigate and perform actions.

Performance: The system should load pages and process transactions quickly to ensure a
smooth user experience.

Scalability: Able to handle increasing amounts of users and transactions without degradation
in performance.

Security: Secure user data and transactions, implementing encryption for sensitive
information and compliance with relevant data protection regulations.

Reliability: High availability and minimal downtime, with backup and recovery processes in
place.

Accessibility: Designed to be accessible to users with disabilities, following WCAG (Web
Content Accessibility Guidelines).

## Use Case Diagram
![Use Case Diagram](/Requirments/use_case_diagram.jpg)

## User Stories
As a guest, I want to browse events so that I can view information about various events
without logging in.

As a user, I want to register and log into the platform so that I can access full features like
purchasing tickets and commenting.

As an event organizer, I want to add and modify event details so that I can list my events on
the platform for users to see.

As a system admin, I want to approve or reject events submitted by organizers so that only
verified events are published.

As a user, I want to rate and comment on events I've attended so that I can share feedback
with others.

As a user, I want to manage my profile information so that I can keep my personal details up
to date.

As a user, I want to search for events by category, date, or location so that I can find events
that interest me easily.

As a user, I want to place orders for event tickets and proceed to payment so that I can
attend events I'm interested in.

As an event organizer, I want to set ticket prices and types for my events so that users can
purchase the appropriate tickets.

As a system admin, I want to monitor system activity and view statistics so that I can
manage the platform effectively.

## Getting Started
Provide instructions on setting up the project locally, including any dependencies, environment setup, and configuration.

## Feedback and Contributions
Encourage users and developers to provide feedback, report issues, and contribute to the project through pull requests.

---

Thank you for choosing the Pentakill Event Ticketing Platform! If you have any questions or need assistance, feel free to contact us.
