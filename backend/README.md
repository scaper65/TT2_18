# WebApp boilerplate using Flask API

- Integrated with Pipenv for package managing.
- Use of .env file.
- SQLAlchemy integration for database abstraction.
- This project is heavily modified and simplified from flask backend provided https://start.4geeksacademy.com/ to be used for hackathons

### Back-End Manual Installation:

It is recomended to install the backend first, make sure you have Python 3.8, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure yo replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Start the virtual env `$ pipenv shell`
<!-- 8. Run this command to seed the database `$ flask insert-test-users 5` -->
9. Run the application: `$ pipenv run start`


auth login url
http://127.0.0.1:5000/auth/login