create database sqldemo;

create table user(id VARCHAR(40) default (uuid()) not null primary key,username varchar(500) not null,contact varchar(11) not null,address varchar(600) not null,city varchar(500) not null);

insert into user(username,contact,address,city) values('sagar', '1234567890','guru govind','kota');

drop table user;

UPDATE User
SET UserName = 'Alfred Schmidt', City = 'Frankfurt'
WHERE UserID = 1;

DELETE FROM user WHERE id = 1;

SELECT * FROM user WHERE id = 1;