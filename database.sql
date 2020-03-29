CREATE TABLE "weekendToDo" (
    "id" serial PRIMARY KEY,
    "task" varchar(250) NOT NULL,
    "status" varchar(20) DEFAULT 'Not Completed'
    );

INSERT INTO "weekendToDo" ("task") VALUES ('Get groceries');

INSERT INTO "weekendToDo" ("task") VALUES ('Vacuum');

INSERT INTO "weekendToDo" ("task") VALUES ('Walk the dog');

SELECT * FROM "weekendToDo";

INSERT INTO "weekendToDo" ("task") VALUES ('Go for a walk');

SELECT * FROM "weekendToDo";

DELETE FROM "weekendToDo" WHERE "id"='1'

SELECT * FROM "weekendToDo";

UPDATE "weekendToDo" SET "status"='Completed' WHERE "id"=15;

SELECT * FROM "weekendToDo" ORDER BY "id";

