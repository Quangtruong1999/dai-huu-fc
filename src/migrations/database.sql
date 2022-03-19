--Create a position
CREATE TABLE IF NOT EXISTS position
(ID SERIAL,
name VARCHAR(255),
CONSTRAINT A_POS_FK PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS contact(
    ID SERIAL,
    full_name VARCHAR(255),
    email VARCHAR(255),
    content TEXT,
    CONSTRAINT A_CONTACT_FK PRIMARY KEY (ID)
)

CREATE TABLE IF NOT EXISTS manager(
    ID SERIAL,
    full_name VARCHAR(255),
    nationality 
)



-- SET SEARCH_PATH TO work;
--Insert into position table
INSERT INTO position (name) VALUES ('Thủ môn');
INSERT INTO position (name) VALUES ('Tiền vệ');
INSERT INTO position (name) VALUES ('Tiền đạo');
INSERT INTO position (name) VALUES ('HLV Trưởng');
INSERT INTO position (name) VALUES ('Trợ lý HLV');
INSERT INTO position (name) VALUES ('Chuyên viên y tế');
INSERT INTO position (name) VALUES ('Chuyên viên vật lý trị liệu');
INSERT INTO position (name) VALUES ('Cán bộ hậu cần');

-- drop table position;
