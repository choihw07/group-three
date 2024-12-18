from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('booth.html')

@app.route('/menu')
def menu():
    return render_template('menu.html') 
 # 메뉴 페이지

@app.route('/buy/<item_id>')
def buy(item_id):
    return render_template(f'buy_{item_id}.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
