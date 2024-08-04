import { boolean } from "drizzle-orm/pg-core";
import { integer, pgTable, serial,text, varchar } from "drizzle-orm/pg-core";

export const MockEval = pgTable("mockeval",{
    id: serial("id").primaryKey(),
    createdByID: varchar("createdByID").notNull(),
    createdByName: varchar("createdByName").notNull(),
    createdAt:varchar("createdAt"),
    mockAIQuestions:text("mockAIQuestions"),
    mockAIMetrics:text("mockAIMetrics"),
    mockAIRecommentdations:text("mockAIRecommentdations"),
    mockTitle:varchar("mockTitle").notNull(),
    mockDesc:varchar("mockDesc").notNull(),
    mockType:varchar("mockType").notNull(),
    mockCVText:text("mockCVText"),
    mockUserAge:integer("mockUserAge").notNull(),
    mockID:varchar("mockID").notNull(),
    isCall:boolean("isCall").notNull()
});