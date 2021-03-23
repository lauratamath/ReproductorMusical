CREATE TABLE Plan (
	type varchar (7) primary key,
	price decimal not null
);

CREATE TABLE Songs (
	artist text not null,
	gender text not null, 
	album text not null, 
	song text not null, 
	duration decimal not null, 
	release date not null,
	
	CONSTRAINT PK_Songs PRIMARY KEY (artist, song)
);

CREATE TABLE UserAccount (
	username varchar(10) primary key,
	password varchar(32) not null,
	type varchar(7) not null,
	FOREIGN KEY (type) REFERENCES Plan(type)
); 

CREATE TABLE EmailManagment (
	username varchar(10) not null,
	email varchar(320) primary key,
	FOREIGN KEY (username) REFERENCES UserAccount(username)
);

CREATE TABLE FreeMembership (
	username varchar(10) not null,
	dateTime date not null,
	tracks int
);

CREATE TABLE PremiumMembership (
	username varchar(10) not null,
	dateTime date not null,
	paymenthMethod varchar(16) not null
);

CREATE TABLE Playlist (
	username varchar(10) not null,
	playlistName varchar(15) not null,
	song text not null,
	artist text not null,
	
	CONSTRAINT PK_Playlist PRIMARY KEY (username, playlistName, song, artist),
);

CREATE TABLE CreatorsMembership (
	username varchar(10) not null,
	dateTime date not null,
	paymenthMethod varchar(16) not null,
	artist text not null,
	creatorsType varchar(7) not null,
	income decimal not null,
	
	FOREIGN KEY (username) REFERENCES UserAccount(username),
	CONSTRAINT PK_CreatorsMembership PRIMARY KEY (username, artist)
);

CREATE TABLE AccountManager (
	username varchar(10) not null,
	song text not null, 
	artist text not null,
	dateTime date not null,
	tracks int,

);


ALTER TABLE useraccount ADD dateSubscribed date;

-- Pruebas. Terminado
INSERT INTO plan
	VALUES('Free',0.00),
	('Premium',7.99),
	('Creator',34.99),
	('Admin',0.00);

INSERT INTO useraccount 
	VALUES('Olivverde','M@sterKey12','Free', '2021/03/10'),
	('aamaya','Carlos12321','Premium', '2021/03/10'),
	('LauraTam','XoxoTKM@35','Creator', '2021/03/10'),
	('Sergio.M','Kript0Curr3ncy','Admin', '2021/02/01'),
	('Ale_King','N03m0jisPLS','Creator', '2021/01/10'),
	('Brandy34','pelusa111','Free', '2020/08/11'),
	('Lil.Benj','grimes00','Free', '2020/08/11'),
	('Carmendez','AserejeAjaBeje','Premium', '2020/09/11'),
	('Eclistes','Arg@niam66','Free', '2020/10/21'),
	('Sprite_arg','prisming25','Premium', '2020/11/21'),
	('Roll_Spot','Haikyu!!','Creator', '2020/11/21'),
	('Ymir_novo','smitingHumans','Admin', '2020/12/21'),
	('VoceGosta','specialMigraine','Creator', '2020/12/21'),
	('ReGrease','sendHelp11','Free', '2021/01/13'),
	('Colosus.ss','exCrush55','Free', '2020/02/21'),
	('DellyPC','asraelMic3','Premium', '2020/03/21');

INSERT INTO emailmanagment
	VALUES('Olivverde','oliver.milian00@gmail.com'),
	('aamaya','aamalin.amaya@gmail.com'),
	('LauraTam','lauratamath@gmail.com'),
	('Sergio.M','sergio.55@hotmail.com'),
	('Ale_King','alejadra.reynoso@yahoo.com'),
	('Brandy34','brandon_hernan@outlook.com'),
	('Lil.Benj','davidramirez12@yopmail.com'),
	('Carmendez','carmen.cadenita@gmail.com'),
	('Eclistes','eclesias.arm@gmail.com'),
	('Sprite_arg','roberto_gg@hotmail.com'),
	('Roll_Spot','esmeraldaRocio@gmail.com'),
	('Ymir_novo','douglascristian@yopmail.com'),
	('VoceGosta','radio.spectrum@gmail.com'),
	('ReGrease','expressMatter@gmail.com'),
	('Colosus.ss','oliv.milian@gmail.com'),
	('DellyPC','patrick.mill@hotmail.com');

INSERT INTO freemembership
	VALUES('Olivverde','2021-03-13 00:00:00',1),
	('Brandy34','2021-03-13 00:00:00',2),
	('Lil.Benj','2021-03-13 00:00:00',3),
	('Eclistes','2020-05-24 00:00:00',0),
	('ReGrease','2020-09-17 00:00:00',1),
	('Colosus.ss','2019-01-31 00:00:00',2);
	

INSERT INTO premiummembership
	VALUES('aamaya','2021-03-12 23:59:59','0123456789101112'),
	('Carmendez','2021-03-12 23:59:59','2111019876543210'),
	('Sprite_arg','2021-03-12 23:59:59','0773456099105512'),
	('DellyPC','2021-03-12 23:59:59','0123424389100872');
	
	
INSERT INTO creatorsmembership
	VALUES('LauraTam','2021-03-12 23:59:59','1123581331853211','Laurasia','Artist','100'),
	('Ale_King','2021-03-12 23:59:59','0012993488567764','Ale King','Manager','200'),
	('Roll_Spot','2021-03-12 23:59:59','1123588861851131','Rolly','Artist','300'),
	('VoceGosta','2021-03-12 23:59:59','1121177931853211','Vongy','Artist','50');
	

INSERT INTO songs
	VALUES('Laurasia','CumbiaPop','La columba','humillarme es mi deber',3.13,'2020-03-12'),
	('Laurasia','CumbiaPop','Quede','No hay mesa',2.52,'2020-05-25'),
	('Laurasia','Balada','Amiges','Arriba las guapas',3.53,'2021-01-15'),
	('Ale King','Pop','Ale 25','Caerle a la variable',2.41,'2019-07-19'),
	('Ale King','Rock','No mi ciela','I want to break free REMIX feat. Laurasia',4.02,'2021-03-01'),
	('Ale King','Rock','No mi ciela','Atrapada',3.22,'2021-03-01'),
	('Ale King','Rock','No mi ciela','Primero crisis, luego existo',3.00,'2021-03-01'),
	('Rolly','Pop','Rolling','Falling apart, again',3.20,'2020-11-30'),
	('Rolly','Pop','Rolling','Growing in the wrong side',2.55,'2020-11-30'),
	('Rolly','Pop','Risking','NO',3.21,'2020-02-14'),
	('Rolly','Pop','Risking','against the stream',3.01,'2020-02-14'),
	('Vongy','Indie','Cringe','Ew',3.00,'2020-12-24'),
	('Vongy','Indie','Cringe','Judas but no Gaga',2.50,'2020-12-24'),
	('Vongy','Indie','Cringe','Better from Heaven',3.49,'2020-12-24');
	
INSERT INTO accountmanager
	VALUES('Olivverde','humillarme es mi deber','Laurasia','2021-03-13 00:03:13',1 ),
	('ReGrease','Better from Heaven','Vongy','2020-11-21 10:00:01',9),
	('Brandy34','humillarme es mi deber','Laurasia','2021-03-13 00:03:13',1),
	('Brandy34','No hay mesa','Laurasia','2021-03-13 00:05:05',1),
	('Lil.Benj','Arriba las guapas','Laurasia','2021-03-13 00:03:53',1),
	('Lil.Benj','I want to break free REMIX feat. Laurasia','Ale King','2021-03-13 00:07:55',1),
	('Lil.Benj','Primero crisis, luego existo','Ale King','2021-03-13 00:10:55',1 ),
	('aamaya','Better from Heaven','Vongy','2020-07-20 20:10:55',5),
	('aamaya','NO','Rolly','2020-10-24 20:55:55',1),
	('aamaya','Ew','Vongy','2020-06-06 00:05:07',2),
	('Sprite_arg','Better from Heaven','Vongy','2020-08-25 06:25:11',1),
	('Sprite_arg','Falling apart, again','Rolly','2020-07-29 19:43:11',1),
	('Sprite_arg','NO','Rolly','2020-04-19 09:25:11',1),
	('Sprite_arg','against the stream','Rolly','2020-03-11 23:05:07',2),
	('Sprite_arg','Better from Heaven','Vongy','2020-09-09 09:09:09',3),
	('Colosus.ss','against the stream','Rolly','2021-01-03 00:00:00',1 ),
	('Colosus.ss','Growing in the wrong side','Rolly','2021-01-04 10:12:20',1 ),
	('Carmendez','Falling apart, again','Rolly','2020-11-30 12:22:20',1 ),
	('Carmendez','Growing in the wrong side','Rolly','2020-11-30 12:26:10',6 ),
	('Carmendez','Judas but no Gaga','Vongy','2021-02-27 13:09:10',2 ),
	('DellyPC','Judas but no Gaga','Vongy','2021-02-27 13:09:10',2 ),
	('DellyPC','Atrapada','Ale King','2021-03-01 15:55:55',1),
	('DellyPC','Caerle a la variable','Ale King','2020-08-15 19:45:32',2),
	('DellyPC','Better from Heaven','Vongy','2020-11-10 18:22:08',1),
	('DellyPC','NO','Rolly','2020-08-13 11:51:15',2);
	
	

INSERT INTO playlist
	VALUES('aamaya','Atrapada','Arriba las guapas','Laurasia'),
	('aamaya','Atrapada','humillarme es mi deber','Laurasia'),
	('aamaya','Atrapada','No hay mesa','Laurasia'),
	('aamaya','Atrapada','I want to break free REMIX feat. Laurasia','Ale King'),
	('Carmendez','ew mood','Primero crisis, luego existo','Ale King'),
	('Carmendez','ew mood','No hay mesa','Laurasia'),
	('Carmendez','ew mood','Better from Heaven','Vongy'),
	('Carmendez','ew mood','Judas but no Gaga','Vongy'),
	('Carmendez','ew mood','against the stream','Rolly'),
	('Sprite_arg','Anymore','NO','Rolly'),
	('Sprite_arg','Anymore','Falling apart, again','Rolly'),
	('Sprite_arg','Anymore','humillarme es mi deber','Laurasia'),
	('Sprite_arg','Anymore','I want to break free REMIX feat. Laurasia','Ale King');


ALTER TABLE songs ADD availability BOOLEAN;
UPDATE songs
SET availability = True;
ALTER TABLE songs ADD url text;
