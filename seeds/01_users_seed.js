/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {username: 'Johnny', password: '$2b$12$foRIu5kq.45yT3m40PngM.QD1oUODErCsDN17ly3KDsercFri1Cfm', created_at: '2022-10-03 15:39:55.613813+00', modified_at: '2022-10-03 15:39:55.613813+00' },
    {username: 'Jimmy', password: '$2a$12$WLNdxhcDpiuJySFSXWSKvOcgd6F9HGW0pfnDl0Vl83y6YbXN1EXlS', created_at: '2022-10-03 15:39:56.613813+00', modified_at: '2022-10-03 15:39:56.613813+00' },
    {username: 'Jerry', password: '$2a$12$rC7Ymbo.WBJUqUVD8XZ5we8.KHsVyljvFTWG9uLrHKONw3xcAH5iO', created_at: '2022-10-03 15:39:57.613813+00', modified_at: '2022-10-03 15:39:57.613813+00' }
  ]);
};
