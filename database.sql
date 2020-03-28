CREATE TABLE "weekendToDo" (
    "id" serial PRIMARY KEY,
    "task" varchar(250) NOT NULL
    );

INSERT INTO "weekendToDo" ("task") VALUES ('Get groceries');

INSERT INTO "weekendToDo" ("task") VALUES ('Vacuum');

INSERT INTO "weekendToDo" ("task") VALUES ('Walk the dog');