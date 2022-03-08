--Create a position
CREATE TABLE position
(ID SERIAL,
NAME VARCHAR(255),
CONSTRAINT A_POS_FK PRIMARY KEY (ID)
);

-- SET SEARCH_PATH TO work;
--Insert into position table
INSERT INTO position (name) VALUES ('Thủ môn');

INSERT INTO position (name) VALUES ('Tiền vệ');

-- drop table position;
