use heroku_243e7185ac90cef;

# Create categories table
create table categories(
	id int primary key AUTO_INCREMENT,
	name varchar(20) not null unique,
    description text
);

# Create plants table
create table plants(
	id int primary key AUTO_INCREMENT,
    stock int not null,
    score int default 0 check(score between 0 and 5),
    image_id varchar(20),
    model_id varchar(20),
    description text,
    name varchar(20) not null unique,
    creationdate date not null,
    price double not null,
    humidity int check(humidity >= 0 and humidity <= 100),
    temperature int,
    height int not null,
    category int not null,
    constraint plants_category foreign key (category) references category(id)
);

# Create clients table. To include: Favorites and scores
create table clients(
	id int primary key AUTO_INCREMENT,
    fullname varchar(100) not null,
    address varchar(255),
    hash varchar(150) not null,
    email varchar(124) not null
);

# Create orders table.
create table orders(
	id int AUTO_INCREMENT,
	client int not null,
    plant int not null,
    datetime datetime(100) not null,
    state enum("Pending", "Processing", "Completed", "Cancelled") default "Pending",
    constraint orders_clients foreign key (client) references clients(id),
    constraint orders_plants foreign key (plant) references plants(id),
    constraint pk_orders primary key (id, client, plant)
);

# Create table to store scores given by clients to plants.
create table scores(
	client int not null,
    plant int not null,
    score int check(score between 0 and 5),
    constraint pk_scores primary key (client, plant)
);








