INSERT INTO users (name, email, password)
VALUES ('Jim-Bob', 'JBezos@amazon.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Makonnen', 'BigMak@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ezra Koenig', 'VampyWeeks@yahoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (2, 'The Armpit', 'Truly the worst place on earth', 'https://a4.pbase.com/o9/41/707241/1/158120928.gY1lsnue.OldShack1020805.jpg', 'https://a4.pbase.com/o9/41/707241/1/158120928.gY1lsnue.OldShack1020805.jpg', 200, 0, 1, 0, 'Canada', 'nowhere Rd.', 'Kalamazoo', 'Manitoba', 'H6X 6L6', true),
VALUES (1, 'The Second Armpit', 'Truly the second worst place on earth', 'https://a4.pbase.com/o9/41/707241/1/158120928.gY1lsnue.OldShack1020805.jpg', 'https://a4.pbase.com/o9/41/707241/1/158120928.gY1lsnue.OldShack1020805.jpg', 200, 0, 1, 0, 'Canada', 'nowhere Rd.', 'Kalamazoo', 'Manitoba', 'H6X 6L6', true),
VALUES (1, 'The Final Armpit', 'Truly the worst place on earth, with an ebullient vitality brimming forth over the rustic threshold of the house.', 'https://a4.pbase.com/o9/41/707241/1/158120928.gY1lsnue.OldShack1020805.jpg', 'https://a4.pbase.com/o9/41/707241/1/158120928.gY1lsnue.OldShack1020805.jpg', 200, 0, 1, 0, 'Canada', 'nowhere Rd.', 'Kalamazoo', 'Manitoba', 'H6X 6L6', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('01-01-2021', '01-03-2021', 1, 3),
VALUES ('01-04-2021', '01-07-2021', 2, 3),
VALUES ('07-14-2021', '09-10-2021', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 1, 0, message),
VALUES (3, 2, 2, 2, message),
VALUES (3, 3, 3, 1, message);