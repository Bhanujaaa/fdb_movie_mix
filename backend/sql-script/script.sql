create table user(user_id int not null auto_increment, username varchar(20) not null unique, email varchar(50) not null, password varchar(20) not null, mobile_no varchar(20), age int,primary key(user_id));
create table admin(admin_id int not null auto_increment, admin_name varchar(20) not null unique, email varchar(50) not null, password varchar(20) not null, mobile_no varchar(20), age int, expirence varchar(20),primary key(admin_id))
create table movies(movie_id int not null auto_increment,title varchar(20), poster_url text,description varchar(100),director varchar(20),duration varchar(20),release_date date, end_date date, is_completed boolean,admin_id int, primary key(movie_id),foreign key(admin_id) references admin(admin_id))
create table location(location_id int not null auto_increment, zipcode int, city varchar(20), state varchar(20),primary key(location_id));
create table theater(theater_id int not null auto_increment, theater_name varchar(20), description varchar(100),theater_url text, admin_id int, location_id int, primary key(theater_id),foreign key(admin_id) references admin(admin_id),foreign key(location_id) references location(location_id));
create table show_time(show_time_id int not null auto_increment, show_name varchar(20) not null, start_time time, end_time time, available_seats int, theater_id int, movie_id int, admin_id int, primary key(show_time_id), foreign key(theater_id) references theater(theater_id),foreign key(movie_id) references movies(movie_id), foreign key(admin_id) references admin(admin_id));
CREATE TABLE movie_persons (
  movie_person_id int NOT NULL AUTO_INCREMENT,
  movie_person_name varchar(255) NOT NULL,
  gender varchar(10) DEFAULT NULL,
  nationality varchar(50) DEFAULT NULL,
  image_url text,
  PRIMARY KEY (movie_person_id)
)
CREATE TABLE genre (
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


create table tickets(ticket_id int auto_increment primary key, ticket_price int, showtime_id int, seat_id int,reservation_id int
, foreign key(showtime_id) references show_time(show_time_id),
foreign key(seat_id) references seat(seat_id),
foreign key(reservation_id) references reservations(reservation_id));



CREATE TABLE parking_area (
    parking_area_ID INT NOT NULL AUTO_INCREMENT,
    parking_area_name VARCHAR(255) NOT NULL,
    capacity INT,
    instructions TEXT,
    theater_id INT,
    PRIMARY KEY (parking_area_ID),
    FOREIGN KEY (theater_id) REFERENCES theater(theater_id)
);


CREATE TABLE language (
    lang_id INT NOT NULL AUTO_INCREMENT,
    lang_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (lang_id)
);

CREATE TABLE movie_language (
    movie_lang_ID INT NOT NULL AUTO_INCREMENT,
    have_subtitles BOOLEAN,
    movie_ID INT,
    language_ID INT,
    PRIMARY KEY (movie_lang_ID),
    FOREIGN KEY (movie_ID) REFERENCES movies(movie_ID),
    FOREIGN KEY (language_ID) REFERENCES language(lang_id)
);
create table coupons(coupon_id int auto_increment primary key, coupon_name varchar(50), coupon_discount int, is_expired boolean, admin_id int , foreign key(admin_id) references admin(admin_id));
create table user_coupon(uc_id int auto_increment primary key, user_id int, coupon_id int,is_used boolean, foreign key(user_id) references user(user_id),foreign key(coupon_id) references coupons(coupon_id));

create table review(review_id int auto_increment primary key, movie_rating float, comment varchar(100),review_date date, user_id int, movie_id int, 
foreign key(user_id) references user(user_id),foreign key(movie_id) references movies(movie_id))