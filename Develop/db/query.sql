-- SELECT *
-- FROM course_names
-- JOIN department ON course_names.department = department.id;


SELECT
  favorite_books.book_name AS name, book_prices.price AS price
FROM favorite_books
JOIN book_prices ON favorite_books.book_price = book_prices.id;


-- SELECT *
-- FROM course_names
-- JOIN department ON course_names.department = department.id;
