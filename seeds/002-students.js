exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Jon', cohorts_id: 1},
        {name: 'Arya', cohorts_id: 1},
        {name: 'Bran', cohorts_id: 1},
        {name: 'Sansa', cohorts_id: 2},
        {name: 'Tyrion', cohorts_id: 2},
        {name: 'Brienne', cohorts_id: 2}
      ]);
    });
};
