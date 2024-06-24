# letzter Stand

import shutil
from flask import Flask
from flask import render_template_string, redirect, request, render_template

import os
import subprocess
import socket

messages = []


app = Flask(__name__)

@app.route('/')
def home():
    return render_template('layout.html')



@app.route('/kontakte')
def kontakte():
    return render_template('kontakte.html')

@app.route('/terminkalender')
def terminkalender():
    return render_template('kalender.html')

@app.route('/test')
def test():
    
    return render_template('test.html')

@app.route('/dateien')
def root():
    return render_template('dateien.html', show_current_path = os.getcwd().replace('/Users/jonas/PycharmProjects/Nachhilfe Manager', '/'),
        current_path = os.getcwd(),

         file_list = subprocess.check_output('ls', shell=True, cwd= os.getcwd()).decode('utf8').split('\n',))

@app.route('/forum', methods=['GET', 'POST'])
def forum():
    if request.method == 'POST':
        message = request.form['message']
        messages.append(message)

        return render_template('forum.html', message=message,
             messages=messages)
    else:
        return render_template('forum.html')


@app.route('/cd')
def cd():
    os.chdir(request.args.get('path'))
    return redirect('/')

@app.route('/view')
def view():
    return subprocess.check_output('cat ' + request.args.get('file'), shell=True).decode('utf-8').replace('n', '<br>')
# nur für eingeloggte nutzer


# später zu socket server wechseln

if __name__ == '__main__':
    app.run(debug=True, port=4000)
