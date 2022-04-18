use test;

insert into categories(name, description, created_at, updated_at) values
("cactus", "“I’ll grow anywhere, I’m a loyal member of the night club, and my growth habits are unique!”", now(), now()),
("aloe vera", "“I’ll grow anywhere, I’m a loyal member of the night club, and my growth habits are unique!”", now(), now()),
("succulent", "“I’ll grow anywhere, I’m a loyal member of the night club, and my growth habits are unique!”", now(), now()),
("deco", "“I’ll grow anywhere, I’m a loyal member of the night club, and my growth habits are unique!”", now(), now())
;

insert into plants(name, description, stock, price, height, temperature, humidity, category_id, created_at, updated_at) values
("Bush lily", "Coming forward its flower, Bush lily decorates mostly indoors such as conservatory, closed places, and so forth.", 20, 9.99, 0.5, 23, 60, 4, now(), now()),
("Snakeplant", "If a prize were available for the most tolerant plant, snake plant (Sansevieria) would certainly be one of the frontrunners.", 20, 15.99, 0.7, 25, 20, 2, now(), now()),
("Cushon Bush", "Cushion bush, also known as silver bush (Leucophyta brownii) is a very tough and attractive perennial, native to Australia. It’s very popular in pots, borders and larger clumps in the garden.", 20, 12.99, 0.4, 10, 15, 4, now(), now()),
("Joseph's Coat", "Codiaeum variegatum is the scientific name for the plant also named variegated croton. This plant demand quite a lot of care and attention, which makes them not the easiest to grow.", 20, 8.99, 0.3, 10, 15, 4, now(), now())
;

insert into users(full_name, email, password, salt, created_at, updated_at) values
("Admin", "admin@gmail.comcategories","$2b$10$jGzjeTwEoXcscrZK7A1GB.8hC/sFKE09OeWsiO52pgjtcszzZ81h2", "$2b$10$jGzjeTwEoXcscrZK7A1GB.", now(), now())
;

-- insert into orders(total, state, shipping_method, billing_address, payment_method, client_id, created_at, updated_at) values
-- (66, "Completed", "CE", "Steet cool 21 billabord xxx", 1, 1, now(), now()),
-- (66.9, "Completed", "UPSE", "Steet cool 21 billabord xxx", 2, 1, now(), now()),
-- (12.99, "Pending", "UPSE", "Steet cool 21 billabord xxx", 1, 1,now(), now()),
-- (4, "Processing", "CE", "Steet cool 21 billabord xxx", 2, 1,now(), now())
-- ;

-- insert into order_details(order_id, plant_id, amount, price, created_at, updated_at) values
-- (1, 1, 2, 15.98, now(), now()),
-- (1, 2, 1, 15.99,now(), now()),
-- (2, 1, 2, 15.99, now(), now()),
-- (3, 3, 1, 12.99, now(), now()),
-- (4, 4, 2, 17.98, now(), now())
-- ;


insert into scores(value, message, plant_id, client_id, created_at, updated_at) values
(2, "A meh plant. I'd prefer it to be white...", 1, 1, now(), now()),
(1, "Just horrible...", 2, 1, now(), now()),
(4, "It's a very good plant!!! You should by it.", 3, 1, now(), now()),
(5, "It's a noice plant! Give it a try.", 4, 1, now(), now())
;




