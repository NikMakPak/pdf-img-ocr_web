-- creating pg database
CREATE DATABASE user_results;
CREATE table results(
    result_id SERIAL PRIMARY KEY,
    result_value text
)
