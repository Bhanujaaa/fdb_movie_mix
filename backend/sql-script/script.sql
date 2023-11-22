create table user(user_id int not null auto_increment, username varchar(20) not null unique, email varchar(50) not null, password varchar(20) not null, mobile_no varchar(20), age int,primary key(user_id));
create table admin(admin_id int not null auto_increment, admin_name varchar(20) not null unique, email varchar(50) not null, password varchar(20) not null, mobile_no varchar(20), age int, expirence varchar(20),primary key(admin_id))
create table movies(movie_id int not null auto_increment,title varchar(20), poster_url text,description varchar(100),director varchar(20),duration varchar(20),release_date date, end_date date, is_completed boolean, primary key(movie_id),foreign key(admin_id) references admin(admin_id))
create table location(location_id int not null auto_increment, zipcode int, city varchar(20), state varchar(20),primary key(location_id));
create table theater(theater_id int not null auto_increment, theater_name varchar(20), description varchar(100),theater_url text, admin_id int, location_id int, primary key(theater_id),foreign key(admin_id) references admin(admin_id),foreign key(location_id) references location(location_id));
create table show_time(show_time_id int not null auto_increment, show_name varchar(20) not null, start_time time, end_time time, available_seats int, theater_id int, movie_id int, admin_id int, primary key(show_time_id), foreign key(theater_id) references theater(theater_id),foreign key(movie_id) references movies(movie_id), foreign key(admin_id) references admin(admin_id));
CREATE TABLE movie_persons (
    movie_person_id INT AUTO_INCREMENT PRIMARY KEY,
    movie_person_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10),
    nationality VARCHAR(50)
);
CREATE TABLE Genre (
    genre_id INT AUTO_INCREMENT PRIMARY KEY,
    genre_name VARCHAR(255) NOT NULL
);
CREATE TABLE movie_genre (
    movie_genre_ID INT AUTO_INCREMENT PRIMARY KEY,
    movie_ID INT,
    genre_ID INT,
    FOREIGN KEY (movie_ID) REFERENCES movies(movie_id),
    FOREIGN KEY (genre_ID) REFERENCES Genre(genre_id)
);

CREATE TABLE producers (
    producer_ID INT AUTO_INCREMENT PRIMARY KEY,
    movie_ID INT,
    movie_person_id INT,
    investment DECIMAL(10, 2),
    FOREIGN KEY (movie_ID) REFERENCES movies(movie_ID),
    FOREIGN KEY (movie_person_id) REFERENCES movie_persons(movie_person_id)
);

CREATE TABLE actors (
    actor_ID INT AUTO_INCREMENT PRIMARY KEY,
    movie_ID INT,
    movie_person_id INT,
    FOREIGN KEY (movie_ID) REFERENCES movies(movie_ID),
    FOREIGN KEY (movie_person_id) REFERENCES movie_persons(movie_person_id)
);

create table seat(seat_id int auto_increment,seat_name varchar(5),showtime_id int, is_selected boolean, primary key(seat_id),
FOREIGN KEY (showtime_id) REFERENCES show_time(show_time_id)
);
create table reservations(reservation_id int auto_increment primary key, booking_date date, total_amount int, num_tickets int,user_id int,showtime_id int,
FOREIGN KEY (showtime_id) REFERENCES show_time(show_time_id),
foreign key (user_id) references user(user_id));

-- first create reservations table and then tickets table.

create table tickets(ticket_id int auto_increment primary key, ticket_price int, showtime_id int, seat_id int,reservation_id int
, foreign key(showtime_id) references show_time(show_time_id),
foreign key(seat_id) references seat(seat_id),
foreign key(reservation_id) references reservations(reservation_id));




