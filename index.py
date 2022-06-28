from flask import Flask, render_template, request, redirect, url_for                    #LIBRERIAS
import os                                           #importacón de librería os


# Inicializar la aplicacion
app = Flask(__name__, template_folder='templates')
app._static_folder = os.path.abspath("templates/static/")                       #Carpeta static de los templates


@app.route('/')         # Ruta principal 
def home():
    return render_template("layouts/home.html")



if __name__ == '__main__':
    app.run(debug=True) # Ejecuta la aplicacion