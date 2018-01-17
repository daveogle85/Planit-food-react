-- SELECT * FROM DayCard_has_Recipes INNER JOIN DayCard ON DayCard_has_Recipes.DayCard_idDayCard = idDayCard JOIN Recipes ON DayCard_has_Recipes.Recipes_idRecipes = idRecipes;

-- TRUNCATE TABLE planit_food_db.DayCard_has_Recipes

-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(3, 1);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(3, 2);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(4, 1);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(4, 3);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(4, 6);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(5, 5);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(6, 4);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(6, 6);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(7, 8);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(7, 7);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(8, 2);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(8, 6);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(8, 8);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(9, 1);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(10, 3);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(10, 5);

-- CREATE DATABASE `plainitfood-db`;

-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal1');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal2');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal3');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal4');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal5');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal6');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal7');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal8');

-- INSERT INTO `planit_food_db`.DayCard(`date`) VALUES('2018-01-15 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(`date`) VALUES('2018-01-14 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(`date`) VALUES('2018-01-13 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(`date`) VALUES('2018-01-12 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(`date`) VALUES('2018-01-11 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(`date`) VALUES('2018-01-10 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(`date`) VALUES('2018-01-09 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(`date`) VALUES('2018-01-07 10:13:22');

-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 2', '2018-01-15 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 3', '2018-01-14 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 4', '2018-01-13 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 5', '2018-01-12 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 6', '2018-01-11 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 7', '2018-01-10 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 8', '2018-01-09 10:13:22');

-- DELETE FROM planit_food_db.DayCard WHERE idDayCard=2;