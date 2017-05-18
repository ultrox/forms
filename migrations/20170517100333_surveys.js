
exports.up = function(knex, Promise) {
	return knex.schema.createTable('surveys', function(table) {
		table.increments();
		table.string('firstname').notNullable();
		table.string('lastname').notNullable();
		table.string('email').notNullable();
		table.string('state').notNullable();
		table.integer('annualincome').notNullable();
		table.timestamps();
	})

};

exports.down = function(knex, Promise) {
  
};
