const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const string = [email];
  const query = `SELECT * FROM users WHERE email= $1 `;

  return pool
    .query(query, string)
    .then((res) => {
      if (res.rows) {
        return res.rows[0];
      }
      return null;
    })
    .catch((err) => err.message);
};

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const string = [id];
  const query = `SELECT * FROM users WHERE id=$1`;
  pool.query(query, string).then((res) => {
    return res.rows[0];
  });

  return Promise.resolve(user);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (obj) {
  const query = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`;
  const string = obj;
  
  return pool.query(query, string).then(res => res.rows);
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const query = `SELECT * FROM reservations WHERE guest_id = $1;`;
  const string = [guest_id];
  return pool.query(query, string).then((res) => {
    return res.rows;
  });
  return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const question = `SELECT * FROM properties LIMIT $1;`;
  pool
    .query(question, [limit])
    .then((res) => {
      // console.log(res.rows);
    })
    .catch((err) => {
      console.log(err);
    });
  const limitedProperties = {};
  for (let i = 1; i <= limit; i++) {
    limitedProperties[i] = properties[i];
  }
  return Promise.resolve(limitedProperties);
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
};
exports.addProperty = addProperty;
