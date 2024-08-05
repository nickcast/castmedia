from flask import Flask, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from dotenv import load_dotenv
from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import InputRequired, Email
import os

dotenv_path = '/home/nickcast/mysite/.env'
load_dotenv(dotenv_path)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://nickcast:{os.getenv("new_code")}@nickcast.mysql.pythonanywhere-services.com/nickcast$default'
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = 'movingM1!'
db = SQLAlchemy(app)

class AuditLead(db.Model):
    __tablename__ = "audit_leads"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    work_email = db.Column(db.String(250), unique=True, nullable=False)
    company_name = db.Column(db.String(250), unique=True, nullable=False)
    company_desc = db.Column(db.String(250), nullable=False)

class LeadForm(FlaskForm):
    name = StringField('Name', validators=[InputRequired()])
    work_email = StringField('Work Email', validators=[InputRequired(), Email()])
    company_name = StringField('Company Name', validators=[InputRequired()])
    company_desc = StringField('Company Description', validators=[InputRequired()])

@app.route('/', methods=["POST", "GET"])
def home():
    lead_form = LeadForm()
    if lead_form.validate_on_submit():
        name = lead_form.name.data
        work_email = lead_form.work_email.data
        company_name = lead_form.company_name.data
        company_desc = lead_form.company_desc.data
        try:
            opt_lead = AuditLead(name=name, work_email=work_email, company_name=company_name, company_desc=company_desc)
            db.session.add(opt_lead)
            db.session.commit()
            flash('You Have Been Successfully Registered', 'success')
        except IntegrityError:
            db.session.rollback()
            flash('A record with the same email or company name already exists. Please check your input.', 'error')
        return render_template('index.html', form=lead_form)
    return render_template('index.html', form=lead_form)

@app.route("/viewdb")
def viewdb():
    leads = AuditLead.query.all()
    return render_template('viewdb.html', leads=leads)

if __name__ == '__main__':
    app.run(port=5500)


