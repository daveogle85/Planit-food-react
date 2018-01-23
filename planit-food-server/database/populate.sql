-- SELECT * FROM DayCard_has_Recipes INNER JOIN DayCard ON DayCard_has_Recipes.DayCard_idDayCard = idDayCard JOIN Recipes ON DayCard_has_Recipes.Recipes_idRecipes = idRecipes;

-- SELECT * FROM DayCard_has_Recipes INNER JOIN DayCard ON DayCard_has_Recipes.DayCard_idDayCard = idDayCard JOIN Recipes ON DayCard_has_Recipes.Recipes_idRecipes = idRecipes WHERE idDayCard=3 ;

-- TRUNCATE TABLE planit_food_db.DayCard_has_Recipes

-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180113, 1);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180113, 2);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180114, 1);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180114, 3);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180114, 6);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180115, 5);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180112, 4);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180112, 6);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180111, 8);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180111, 7);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180110, 2);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180110, 6);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180110, 8);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180109, 1);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180109, 3);
-- INSERT INTO planit_food_db.DayCard_has_Recipes(DayCard_idDayCard, Recipes_idRecipes) VALUES(20180109, 5);

-- CREATE DATABASE `plainitfood-db`;

-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal1');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal2');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal3');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal4');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal5');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal6');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal7');
-- INSERT INTO `planit_food_db`.Recipes(recipeName) VALUES('meal8');

-- INSERT INTO `planit_food_db`.DayCard(idDayCard, `date`) VALUES(20180115, '2018-01-15 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(idDayCard, `date`) VALUES(20180114, '2018-01-14 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(idDayCard, `date`) VALUES(20180113, '2018-01-13 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(idDayCard, `date`) VALUES(20180112, '2018-01-12 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(idDayCard, `date`) VALUES(20180111, '2018-01-11 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(idDayCard, `date`) VALUES(20180110, '2018-01-10 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(idDayCard, `date`) VALUES(20180109, '2018-01-09 10:13:22');
-- INSERT INTO `planit_food_db`.DayCard(idDayCard, `date`) VALUES(20180107, '2018-01-07 10:13:22');

-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 2', '2018-01-15 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 3', '2018-01-14 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 4', '2018-01-13 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 5', '2018-01-12 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 6', '2018-01-11 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 7', '2018-01-10 10:13:22');
-- INSERT INTO `plainitfood-db`.DayCard(meal_name, meal_date) VALUES('meal 8', '2018-01-09 10:13:22');

-- DELETE FROM planit_food_db.DayCard WHERE idDayCard=2;
-- USE planit_food_db;
-- SELECT * FROM DayCard WHERE `planit_food_db`.DayCard.idDayCard=LAST_INSERT_ID();

-- INSERT INTO planit_food_db.Tags(tagName, tagColour) VALUES('VEGETARIAN', 'GREEN');
-- INSERT INTO planit_food_db.Tags(tagName, tagColour) VALUES('QUICK', 'YELLOW');
-- INSERT INTO planit_food_db.Tags(tagName, tagColour) VALUES('FISH', 'BLUE');
-- INSERT INTO planit_food_db.Tags(tagName, tagColour) VALUES('PORK', 'RED');
-- INSERT INTO planit_food_db.Tags(tagName, tagColour) VALUES('LONG COOK', 'PURPLE');

-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(1, 1);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(2, 2);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(2, 3);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(3, 4);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(4, 2);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(4, 3);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(4, 4);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(4, 5);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(5, 5);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(2, 8);
-- INSERT INTO planit_food_db.Tags_has_Recipes(Tags_idTags, Recipes_idRecipes) VALUES(3, 8);
