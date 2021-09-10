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
  const query = `SELECT * FROM users WHERE email= $1;`;

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

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const string = [id];
  const query = `SELECT * FROM users WHERE id=$1;`;
  pool.query(query, string).then((res) => {
    return res.rows[0];
  });

  return Promise.resolve(user);
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (obj) {
  const query = `INSERT INTO users (name, email, password) VALUES ($1 $2 $3) RETURNING *`;
  const string = obj;

  return pool.query(query, string).then((res) => res.rows);
};

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

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function (options, limit = 10) {
  const question = `SELECT properties.*, avg(property_reviews.rating) as average_rating 
  FROM properties
  JOIN property_reviews ON properties.id = property_id`;
  const string = [];

  if (options.city) {
    string.push(`${options.city}`);
    question += `WHERE city LIKE $${string.length}`;
  }
  if (options.owner_id) {
    string.push(`${options.owner_id}`);
    question += `WHERE owneer_id = $${string.length}`;
  }

  if (options.minimum_price_per_night) {
    string.push(options.minimum_price_per_night * 100);
    if (string.length === 1) {
      question += `WHERE cost_per_night > $${string.length} `;
    } else {
      question += `AND cost_per_night > $${string.length} `;
    }
  }

  if (options.maximum_price_per_night) {
    string.push(options.maximum_price_per_night * 100);
    if (string.length === 1) {
      question += `WHERE cost_per_night$ < $${string.length} `;
    } else {
      question += `AND cost_per_night < $${string.length} `;
    }
  }

  question += `GROUP BY properties.id`;

  if (options.minimum_rating) {
    string.push(options.minimum_rating);
    question += `HAVING avg(property_reviews.rating) >= $${string.length}`;
  }

  string.push(limit);
  question += `ORDER BY cost_per_night
  LIMIT $${string.length};`;

  return pool.query(question, string).then((res) => {
      return res.rows;
    })
    .catch((err) => {
      console.log(err);
      return err.message;
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const question = `INSERT INTO properties
    (owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    province,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms) 
  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *;`;
  string = Object.keys(property);
  return pool.query(question, string).then(res => {
    return res.rows
  })
  .catch(err => {
    return err.message
  })
};

export {
  getUserWithEmail,
  getUserWithId,
  getAllReservations,
  getAllProperties,
  addUser,
  addProperty,
};
