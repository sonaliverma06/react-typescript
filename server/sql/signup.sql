create database sqldemo;

create table signup(id VARCHAR(40) default (uuid()) not null primary key,name varchar(500) not null,email varchar(500) not null,password varchar(600) not null);

insert into signup(name,email,password) values('sonali', 'sonali@gmail.com','123');

drop table signup;

UPDATE SignUp
SET Name = 'fhu',   Email = 'ko@gmail.com', Password = '12334 '
WHERE SignUpID = 1;

DELETE FROM signup WHERE id = 1;

SELECT * FROM signup WHERE id = 1;
drop  table sign_up_1;