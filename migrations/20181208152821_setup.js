exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable("heroes", function(table) {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo("now()");
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo("now()");

    table.string("name").notNullable();
    table.string("description").notNullable();
  });

  await knex.schema.createTable("villains", function(table) {
    table
      .uuid("id")
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table
      .timestamp("created_at")
      .notNullable()
      .defaultTo("now()");
    table
      .timestamp("updated_at")
      .notNullable()
      .defaultTo("now()");

    table.string("name").notNullable();
    table.string("description").notNullable();
  });

  return knex;
};

exports.down = async function(knex) {
  await knex.schema.dropTable("heroes");
  await knex.schema.dropTable("villains");
  return knex;
};
