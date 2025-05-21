from os import name
from flask import *
from flask_session import Session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import psycopg2
import redis
from config import ApplicationConfig
from models import User


app = Flask(__name__)
cors = CORS(app,supports_credentials=False)
app.config.from_object(ApplicationConfig)
bcrypt = Bcrypt(app)
server_session = Session(app)


# Connect to the database
conn = psycopg2.connect(database="Employeee_Project", user="postgres",
                        password="root", host="localhost", port="5432")

# create a cursor
cur = conn.cursor()

# if you already have any table or not id doesnt matter this 
# will create a products table for you.
cur.execute(
    '''CREATE TABLE IF NOT EXISTS users (id serial \
    PRIMARY KEY, name varchar(100), email varchar(100), password varchar(100));''')

# commit the changes
conn.commit()

# close the cursor and connection
cur.close()
conn.close()


@app.route("/@me", methods=["GET"])
def get_current_user():
    email = session.get("email")

    if not email:
        return "Unauthorized User"
    
    conn = psycopg2.connect(database="Employeee_Project", user="postgres",
                        password="root", host="localhost", port="5432")

# create a cursor
    cur = conn.cursor()

    
    cur.execute(
        f'''SELECT * FROM users where email_id = '{email}' '''
    )
    
    user_exists = cur.fetchall()
    
    conn.commit()
    cur.close()
    conn.close()
    
    return "user logged in already", 200
    

@app.route("/register", methods=["POST"])
def register_user():
    name = request.json["name"]
    email = request.json["email"]
    password = request.json["password"]
    print(f"{name}, {email}, {password}")
    
    conn = psycopg2.connect(database="Employeee_Project", user="postgres",
                        password="root", host="localhost", port="5432")

# create a cursor
    cur = conn.cursor()

    
    cur.execute(
        f'''SELECT * FROM users Where email_id = '{email}' '''
    )
    
    user_exists = cur.fetchall()
    

    if user_exists:
        return {"value":"User Exists",}, 409
    else:
        cur.execute(
        f'''
        insert into users (name, email_id, password) values ('{name}', '{email}', '{password}')
        ''')
        
        conn.commit()
        cur.close()
        conn.close()
        
        return {"value":"User Registered"}, 200
    
    
@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    conn = psycopg2.connect(database="Employeee_Project", user="postgres",
                    password="root", host="localhost", port="5432")
        
    session["email"] = email
    # session["password"] = password 

# create a cursor
    cur = conn.cursor()

    
    cur.execute(
        f'''SELECT * FROM users Where email_id = '{email}' and password = '{password}' '''
    )
    
    valid_credentials = cur.fetchall()
    
    
    if valid_credentials:
        return {"value":"You Logged In", "name":valid_credentials[0][1], "email":valid_credentials[0][2]}, 200 
    
    else:
        conn.commit()
        cur.close()
        conn.close()
        return {"value":"Invalid Credentials"}, 401
    
 


if __name__ == "__main__":
    app.run(debug=True)