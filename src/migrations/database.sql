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
);


CREATE TABLE IF NOT EXISTS staff(
    ID SERIAL,
    full_name VARCHAR(255),
    nationality VARCHAR(255),
    current_team INT4,
    position_id INT4,
    CONSTRAINT A_MANAGER_PK PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS partners(
    ID SERIAL,
    full_name VARCHAR(255),
    link_web VARCHAR(255),
    content INT4,
    img TEXT,
    CONSTRAINT A_PARTNERS_PK PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS banners(
    ID SERIAL,
    link VARCHAR(255),
    quote VARCHAR(255),
    CONSTRAINT A_BANNERS_PK PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS team(
    ID SERIAL,
    full_name TEXT,
    images TEXT,
    second_name TEXT,
    nick_name TEXT,
    establish INT,
    stadium TEXT,
    capacity INT,
    chairman TEXT,
    manager_id INT,
    website TEXT,
    CONSTRAINT A_TEAM_PK PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS players(
    ID SERIAL,
    team_id INT,
    full_name TEXT,
    position_id INT,
    birthday DATE,
    heights INT,
    weights FLOAT,
    images TEXT,
    number_position INT,
    CONSTRAINT A_PLAYERS_PK PRIMARY KEY (ID) 
);

CREATE TABLE IF NOT EXISTS schedule(
    ID SERIAL,
    team_one_id INT,
    team_second_id INT,
    starts_date DATE,
    starts_time DATE,
    CONSTRAINT A_SCHEDULE_PK PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS match_result(
    ID SERIAL,
    match_id INT,
    team_one_id INT,
    score_one INT,
    team_second_id INT,
    score_second INT,
    CONSTRAINT A_MATCHRESULT_PK PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS match_process(
    ID SERIAL,
    match_id INT,
    player_id INT,
    actions TEXT,
    CONSTRAINT A_MATCHPROCESS_PK PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS recruitment(
    ID SERIAL,
    partner_id INT,
    title TEXT,
    content TEXT,
    image_cover TEXT,
    position INT,
    create_at DATE,
    link TEXT,
    CONSTRAINT A_RECRUITMENT_PK PRIMARY KEY (ID)
);

--Create a users
CREATE TABLE IF NOT EXISTS users(
    ID SERIAL,
    name VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    CONSTRAINT A_USER_PK PRIMARY KEY (ID)
);

-- ALTER TABLE manager ADD CONSTRAINT FK_MANAGER_POSITION FOREIGN KEY (position_id) REFERENCES position (ID);
-- ALTER TABLE manager ADD CONSTRAINT FK_MANAGER_TEAM FOREIGN KEY (current_team) REFERENCES team (ID);
-- ALTER TABLE team ADD CONSTRAINT FK_TEAM_MANAGER FOREIGN KEY (manager_id) REFERENCES manager (ID);
ALTER TABLE schedule ADD CONSTRAINT FK_SCHEDULE_TEAMONE_TEAM FOREIGN KEY (team_one_id) REFERENCES team (ID);
ALTER TABLE schedule ADD CONSTRAINT FK_SCHEDULE_TEAMSECOND_TEAM FOREIGN KEY (team_second_id) REFERENCES team (ID);
ALTER TABLE match_result ADD CONSTRAINT FK_MATCH_RESULT_TEAMONE_TEAM FOREIGN KEY (team_one_id) REFERENCES team (ID);
ALTER TABLE match_result ADD CONSTRAINT FK_MATCH_RESULT_TEAMSECOND_TEAM FOREIGN KEY (team_second_id) REFERENCES team (ID);
ALTER TABLE match_result ADD CONSTRAINT FK_MATCH_RESULT_MATCHID_TEAM FOREIGN KEY (match_id) REFERENCES schedule (ID);
ALTER TABLE players ADD CONSTRAINT FK_PLAYERS_TEAM FOREIGN KEY (team_id) REFERENCES team (ID);
ALTER TABLE players ADD CONSTRAINT FK_PLAYERS_POSITION FOREIGN KEY (position_id) REFERENCES position (ID);
ALTER TABLE match_process ADD CONSTRAINT FK_MACTCHPROCESS_SCHEDULE FOREIGN KEY (match_id) REFERENCES schedule (ID);
ALTER TABLE match_process ADD CONSTRAINT FK_MACTCHPROCESS_PLAYERS FOREIGN KEY (player_id) REFERENCES players (ID);
ALTER TABLE recruitment ADD CONSTRAINT FK_RECRUITMENT_PARTNER FOREIGN KEY (partner_id) REFERENCES partners (ID);





-- SET SEARCH_PATH TO work;
--Insert into position table
-- INSERT INTO position (name) VALUES ('Thủ môn');
-- INSERT INTO position (name) VALUES ('Tiền vệ');
-- INSERT INTO position (name) VALUES ('Tiền đạo');
-- INSERT INTO position (name) VALUES ('HLV Trưởng');
-- INSERT INTO position (name) VALUES ('Trợ lý HLV');
-- INSERT INTO position (name) VALUES ('Chuyên viên y tế');
-- INSERT INTO position (name) VALUES ('Chuyên viên vật lý trị liệu');
-- INSERT INTO position (name) VALUES ('Cán bộ hậu cần');

-- drop table position;

--Insert into team table
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Becamex Bình Dương','images/team/BFC/Logo_Becamex_Bình_Dương_2021.png','BFC','Chelsea Việt Nam Cơn lốc miền Đông',1976,'Gò Đậu','18250','Hồ Hồng Thạch','Đặng Trần Chỉnh','http://www.becamexbinhduongfc.com/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Hà Nội','images/team/HNFC/Logo-Hà_Nội_FC_2020.svg.png','HNFC','Đội bóng áo tím',2006,'Hàng Đẫy',22500,'Đỗ Vinh Quang','Chun Jae-ho','https://hanoifc.com.vn/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Hải Phòng','images/team/Logo-Hải_Phòng_FC_2021.svg.png','HPFC','Đội bóng Đất Cảng',1952,'Lạch Trây',30000,'Văn Trần Hoàn','Chu Đình Nghiêm','http://haiphongfootballclub.vn/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Hoàng Anh Gia Lai','images/team/Logo-Hoàng_Anh_Gia_Lai_FC.svg.png','HAGL','Đội bóng phố Núi',2001,'Pleiku',12000,'Đoàn Nguyên Đức','Kiatisuk Senamuang','http://haglfc.com.vn/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Nam Định','images/team/Logo-Nam_Định_FC_logo.svg.png','NDFC','Đội bóng thành Nam',1965,'Thiên Trường',30000,'Nguyễn Tân Anh','Nguyễn Văn Sỹ','');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá TopenLand Bình Định','images/team/Logo-Binh_Dinh_FC_logo.svg.png','BDFC','Đội bóng Đất Võ, PSG Việt Nam',1975,'Quy Nhơn',20000,'Nguyễn Văn Cường','Nguyễn Đức Thắng','');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Sài Gòn(Saigon Football Club)','images/team/Logo-Sai_Gon_FC.svg.png','SGFC','Đội bóng Sài Thành',2016,'Thống Nhất',25000,'Trần Hòa Bình','Phùng Thanh Phương','http://saigonfc.com/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Hồng Lĩnh Hà Tĩnh','images/team/Logo-HLHT_FC.svg.png','HLHT','Đội bóng núi Hồng',2019,'Hà Tĩnh',15000,'Nguyễn Tiến Dũng','Nguyễn Thành Công','https://honglinhhatinhfc.com/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá SHB Đà Nẵng','images/team/Logo-CLB_SHB_Đà_Nẵng.svg.png','SHBĐN','Đội bóng sông Hàn',1976,'Hòa Xuân',20500,'Bùi Xuân Hòa','Phan Thanh Hùng','https://shbdanangfc.com/vi/trang-chu/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Sông Lam Nghệ An','images/team/Logo-New_logo_slna.png','SLNA','Đội bóng xứ Nghệ',1979,'Vinh',18000,'Trương Sỹ Bá','Nguyễn Huy Hoàng','http://www.slnafc.com/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Than Quảng Ninh','images/team/.png','TQN','Đội bóng Đất Mỏ',1956,'Cẩm Phả',16000,'','','http://quangninhfc.vn/');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Đông Á Thanh Hóa','images/team/Logo_Đông_Á_Thanh_Hóa.png','DATH','Đội bóng xứ Thanh Chiến binh Lam Sơn',1962,'Thanh Hóa',14000,'Cao Tiến Đoan','Ljupko Petrović','https://www.facebook.com/ThanhHoaFootballClub.Official');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ bóng đá Thành phố Hồ Chí Minh','images/team/Logo-Hcmcfc-logo.png','HCMC','Chiến hạm đỏ (Red Battleship)',1960,'Thống Nhất',25000,'Nguyễn Hữu Thắng','Trần Minh Chiến','');
INSERT INTO team (full_name, images, second_name, nick_name, establish, stadium, capacity, chairman, manager_id, website)
VALUES ('Câu lạc bộ Đại Hữu','images/team/.png','DHFC','Đội bóng Đại Hữu',1999,'Thống Nhất',25000,'','Pep Guardiola','https://dai-huu-fc.herokuapp.com/');

--insert into player table id = 14 Đại Hữu FC
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Zack Steffen', 1, '02/04/1995', 190, 92, 'images/player/Goalkeepers/zack-steffen.png',1);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Kyle Walker', 9, '05/28/1990', 200, 85, 'images/player/Defenders/kyle-walker.png',3);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Ruben Dias', 9, '05/14/1997',196,80, 'images/player/Defenders/ruben-dias.png',4);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'John Stones', 9, '05/28/1994',185,90, 'images/player/Defenders/john-stones.png',5);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Ilkay Gundogan', 2, '06/19/1995',173,70, 'images/player/Midfielders/Ilkay Gundogan.png',6);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Gabriel Jesus', 3, '03/21/1992',186,86, 'images/player/Forwards/Gabriel Jesus.png',7);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Jack Grealish', 2, '12/12/1995',168,63, 'images/player/Midfielders/Jack Grealish.png',8);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Rodrigo', 2, '12/13/1996', 168, 65, 'images/player/Midfielders/Rodrigo.png',9);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Kevin De Bruyne', 2, '01/15/1994', 185, 75, 'images/player/Midfielders/Kevin De Bruyne.png',11);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Bernardo Silva', 2, '05/25/1994', 166, 66, 'images/player/Midfielders/Bernardo Silva.png',12);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Fernandinho', 2, '05/12/1996', 170, 63, 'images/player/Midfielders/Fernandinho.png',14);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Phil Foden', 2, '02/28/1998', 189, 79, 'images/player/Midfielders/Phil Foden.png',15);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Nathan Ake', 9, '06/15/1997', 170,68, 'images/player/Defenders/nathan-ake.png',16);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Cole Palmer', 2, '06/06/1996', 166, 62, 'images/player/Midfielders/Cole Palmer.png',17);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Riyad Mahrez', 3, '01/01/1992', 195, 80, 'images/player/Forwards/Riyad Mahrez.png',18);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Joao Cancelo', 3, '05/15/1996', 199, 92, 'images/player/Forwards/joao-cancelo.png',19);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Oleksandr Zinchenko', 9, '11/11/1997', 190, 95, 'images/player/Defenders/oleksandr-zinchenko.png',20);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Arijanet Muric', 2, '12/12/1996', 185, 79, '',21);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Phillippe Sandler', 3, '01/15/1994', 190, 85, '',22);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Ederson', 1, '07/28/1995', 185, 85, 'images/player/Goalkeepers/ederson.png',25);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Scott Carson', 1, '09/21/1991',200,90, 'images/player/Goalkeepers/scott-carson.png',26);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Julian Alvarez', 3, '12/25/1994',189,90, '',28);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Paul Pogba', 2, '06/03/1994',199,99, '',29);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Juan Mata', 2, '03/02/1995',201,100, '',33);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Victor Lindelof', 9, '12/14/1998',195,85, '',77);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Aymeric Laporte', 9, '02/09/1996',186, 90, 'images/player/Defenders/aymeric-laporte.png',88);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Cristiano Ronaldo', 3, '05/21/1999',200,100, '',94);
INSERT INTO players (team_id, full_name, position_id, birthday, heights, weights, images, number_position)
VALUES (14, 'Anthony Martial', 3, '11/15/1993',185,90, '',99);

--Insert into staff table
INSERT INTO staff (full_name, nationality, current_team, position_id, images)
VALUES ('Pep Guardiola', 'Việt Nam', 14, 4, 'src\public\images\player\Head coach\Pep Guardiola.png');
INSERT INTO staff (full_name, nationality, current_team, position_id, images)
VALUES ('Richard Wright', 'Việt Nam', 14, 8, 'src\public\images\player\Cadres logistics\Richard Wright.png');
INSERT INTO staff (full_name, nationality, current_team, position_id, images)
VALUES ('Lorenzo Buenaventura', 'Việt Nam', 14, 5, 'src\public\images\player\Assistant coach\Lorenzo Buenaventura.png');
INSERT INTO staff (full_name, nationality, current_team, position_id, images)
VALUES ('Carles Planchart', 'Việt Nam', 14, 6, 'src\public\images\player\Medical specialist\Carles Planchart.png');
INSERT INTO staff (full_name, nationality, current_team, position_id, images)
VALUES ('Juan Manuel Lillo', 'Việt Nam', 14, 6, 'src\public\images\player\Medical specialist\Juan Manuel Lillo.png');
INSERT INTO staff (full_name, nationality, current_team, position_id, images)
VALUES ('Xabier Mancisidor', 'Việt Nam', 14, 6, 'src\public\images\player\Medical specialist\Xabier Mancisidor.png');
INSERT INTO staff (full_name, nationality, current_team, position_id, images)
VALUES ('Carlos Vicens', 'Việt Nam', 14, 7, 'src\public\images\player\Physiotherapist\Carlos Vicens.png');

--insert into partners tables
INSERT INTO partners (full_name, link_web, img)
VALUES ('Sony Việt Nam', 'https://www.sony.com.vn/electronics/corporate', 'images/partners/sony.jpg');
INSERT INTO partners (full_name, link_web, img)
VALUES ('Ngân hàng TMCP Sài Gòn-Hà Nội', 'https://www.shb.com.vn/', 'images/partners/shb.png');
INSERT INTO partners (full_name, link_web, img)
VALUES ('Ngân hàng Công thương Việt Nam', 'https://www.vietinbank.vn/web/home/vn/index.html', 'images/partners/vietinbank.png');
INSERT INTO partners (full_name, link_web, img)
VALUES ('Ngân hàng TMCP Ngoại thương Việt Nam', 'https://portal.vietcombank.com.vn/Pages/Home.aspx', 'images/partners/vcb.png');
-- INSERT INTO position (name) VALUES ('Tiền vệ');
-- INSERT INTO position (name) VALUES ('Tiền đạo');
-- INSERT INTO position (name) VALUES ('HLV Trưởng');
-- INSERT INTO position (name) VALUES ('Trợ lý HLV');
-- INSERT INTO position (name) VALUES ('Chuyên viên y tế');
-- INSERT INTO position (name) VALUES ('Chuyên viên vật lý trị liệu');
-- INSERT INTO position (name) VALUES ('Cán bộ hậu cần');

