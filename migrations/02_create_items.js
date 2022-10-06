/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("items", (table) => {
        table.increments("id").primary();
        table.string("name");
        table.string("description");
        table.integer("quantity");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable("items", (table) =>{
        table.dropForeign("user_id")
    })
    .then(() => {
        return knex.schema.dropTableIfExists("items")
    })
};
