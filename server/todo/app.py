import datetime
from itertools import count
from flask import Flask, Response, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import mysql.connector
import json

from sqlalchemy import DateTime

def create_app():
    app = Flask(__name__)
    CORS(app, origins="*",  resources=r'*')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@db:3306/dbeldorado'
    return app

app = create_app()

db = SQLAlchemy(app)


class Todolist(db.Model):
    id = db.Column(db.Integer, primary_key= True)
    title = db.Column(db.String(255))
    done = db.Column(db.Boolean, default=False, nullable=False)

    def to_json(self):
        return {"id": self.id, "title": self.title, "done": self.done}


@app.route('/')
def index():
    return 'Server on...'  

# add
@app.route("/todo", methods=["POST"])
def add_todolist():
    body = request.get_json()

    try:
        todo = Todolist(title=body["title"])
        db.session.add(todo)
        db.session.commit()
        return response(201, "todolist", todo.to_json(), "Criado com sucesso")
    except Exception as e:
        print('Erro', e)
        return response(400, "usuario", {}, "Erro ao cadastrar")

# remove
@app.route("/todo/<id>", methods=["DELETE"])
def remove_todolist(id):
    todolist_obj = Todolist.query.filter_by(id=id).first()

    try:
        if todolist_obj :
            db.session.delete(todolist_obj)
            db.session.commit()
            return response(200, "todolist", todolist_obj.to_json(), "Deletado com sucesso")
        else:
             return response(200, "todolist", {}, "Não encontrado")
    except Exception as e:
        print('Erro', e)
        return response(400, "todolist", {}, "Erro ao deletar")

#Update
@app.route("/todo/<id>", methods=["PUT"])
def update_todolist(id):
    todolist_obj = Todolist.query.filter_by(id=id).first()
    body = request.get_json()

    try:
        if todolist_obj :
            todolist_obj.title = body["title"]
            db.session.add(todolist_obj)
            db.session.commit()
            return response(200, "todolist", todolist_obj.to_json(), "Atualizado com sucesso")
        else:
            return response(200, "todolist", {}, "Não encontrado")
    except Exception as e:
        print('Erro', e)
        return response(400, "todolist", {}, "Erro ao atualizar")

#markAsDone
@app.route("/todo/done/<id>", methods=["PUT"])
def done_todolist(id):
    todolist_obj = Todolist.query.filter_by(id=id).first()

    try:
        if todolist_obj :
            todolist_obj.done = True        
            db.session.add(todolist_obj)
            db.session.commit()
            return response(200, "todolist", todolist_obj.to_json(), "Atualizado com sucesso")
        else:
            return response(200, "todolist", {}, "Não encontrado")
    except Exception as e:
        print('Erro', e)
        return response(400, "todolist", {}, "Erro ao atualizar")

#markAsUndone
@app.route("/todo/undone/<id>", methods=["PUT"])
def undone_todolist(id):
    todolist_obj = Todolist.query.filter_by(id=id).first()

    try:
        if todolist_obj :
            todolist_obj.done = False        
            db.session.add(todolist_obj)
            db.session.commit()
            return response(200, "todolist", todolist_obj.to_json(), "Atualizado com sucesso")
        else:
            return response(200, "todolist", {}, "Não encontrado")
    except Exception as e:
        print('Erro', e)
        return response(400, "todolist", {}, "Erro ao atualizar")

#save
@app.route("/todo", methods=["POST"])
def save_todolist():
    body = request.get_json()

    try:
        todo = Todolist(title=body["title"])
        db.session.add(todo)
        db.session.commit()
        return response(201, "todolist", todo.to_json(), "Criado com sucesso")
    except Exception as e:
        print('Erro', e)
        return response(400, "todolist", {}, "Erro ao cadastrar")

#GetAll 
@app.route("/todos", methods=["GET"])
def getall_todolists():
    todolist_obj = Todolist.query.all()
    todolist_json = [todolist.to_json() for todolist in todolist_obj]

    return response(200, "todolist", todolist_json)

#GetById
@app.route("/todo/<id>", methods=["GET"])
def getbyid_todolists(id):
    
    try:
        todolist_obj = Todolist.query.filter_by(id=id).first()    
        if todolist_obj :
            return response(200, "todolist", todolist_obj.to_json())
        else:
            return response(200, "todolist", {}, "Não encontrado")
    except Exception as e:
        print('Erro', e)
        return response(400, "todolist", {}, "Erro ao tentar localizar o registro")

#GetByStatus
@app.route("/todo/status/<done>", methods=["GET"])
def getbystatus_todolists(done):
    
    try:
        isDone = done == "true"
        todolist_obj = Todolist.query.filter_by(done=isDone).all()           

        if todolist_obj :
            todolist_json = [todolist.to_json() for todolist in todolist_obj]
            return response(200, "todolist", todolist_json)
        else:
            return response(204, "todolist", {}, "Não encontrado")
    except Exception as e:
        print('Erro', e)
        return response(400, "todolist", {}, "Erro ao tentar localizar o registro")


#GetByTitle
@app.route("/todo/title/<title>", methods=["GET"])
def getbytitle_todolists(title):
    
    try:
        todolist_obj = Todolist.query.filter_by(title=title).first()    
        if todolist_obj :
            return response(200, "todolist", todolist_obj.to_json())
        else:
            return response(200, "todolist", {}, "Não encontrado")
    except Exception as e:
        print('Erro', e)
        return response(400, "todolist", {}, "Erro ao tentar localizar o registro")



#Response Template
def response(status, contentName, content, message = False):
    

    body = {}
    body = content
    if (message):
        body["message"] = message

    return Response(json.dumps(body), status=status, mimetype="application/json")


if __name__ == "__main__":
    app.run(host='0.0.0.0',debug=False,port='8000')