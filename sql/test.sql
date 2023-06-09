CREATE TABLE IF NOT EXISTS test (
  test_id INT NOT NULL,
  name varchar(250) NOT NULL,
  PRIMARY KEY (test_id)
);

INSERT INTO test (test_id,name) VALUES(1, 'success');