from flask import Flask, render_template, request, flash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from send_email import EmailObj
from datetime import datetime, timedelta
import os
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email


from dotenv import load_dotenv
dotenv_path = '/home/nickcast/mysite/.env'
load_dotenv(dotenv_path)



app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://nickcast:{os.getenv("new_code")}@nickcast.mysql.pythonanywhere-services.com/nickcast$default'
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = 'movingM1!'

db = SQLAlchemy(app)


class Lead(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=False, nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    stage = db.Column(db.Integer, unique=False, nullable=False)
    date_reg = db.Column(db.String(250), unique=False, nullable=False)

class LeadForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired(), Email(check_deliverability=True)])
    submit = SubmitField('Submit')

init_email = EmailObj()

# with app.app_context():
#     db.create_all()

@app.route("/", methods=["GET", "POST"])
def home():

    lead_form = LeadForm()
    if request.method == "POST" and lead_form.validate_on_submit():
        name = lead_form.name.data
        email = lead_form.email.data
        stage = 0
        date_reg = datetime.utcnow()
        try:
            lead = Lead(name=name, email=email, stage=stage, date_reg=date_reg)
            db.session.add(lead)
            db.session.commit()
            init_email.send(receiver=email, title="🚀 Mastering Social Media Advertising | Cast Media", content=f"""<!DOCTYPE html><html lang="en"><head> <meta charset="UTF-8"></head><body><h1> Dear {name},</h1> <p style="font-size: 20px;"> Thank you for your interest in our valuable resource. We appreciate your trust in us.<br><br> Click the resource below to download your eBook, <b>Mastering Social Media Advertising</b><br><br> We're here to support your business's growth journey. If you have any questions or need further assistance, don't hesitate to reach out.<br><br> Best regards,<br> Nichita<br> CEO at Cast Media<br><br> </p></body></html>""", atcmt="MasteringSocialMediaAdvertising.pdf")
            flash('Check Your Email For The Ebook', 'success')
        except IntegrityError:
            db.session.rollback()
            flash('A record with the same email already exists. Please change your input.', 'error')
        return render_template('index.html', form=lead_form)
    else:
        return render_template('index.html', form=lead_form)

@app.route("/viewdb")
def viewdb():
    leads = Lead.query.all()
    return render_template('viewdb.html', leads=leads)

if __name__ == "__main__":
    # app.run(debug=True)
    pass

# Daily Script

leads = Lead.query.all()
for lead in leads:
    one_day_ago = (datetime.utcnow() - timedelta(days=1)).date()
    two_days_ago = (datetime.utcnow() - timedelta(days=2)).date()
    lead_date_str = lead.date_reg.split('.')[0]
    lead_date_reg = datetime.strptime(lead_date_str, '%Y-%m-%d %H:%M:%S')
    # Check
    print(one_day_ago)
    print(lead_date_reg.date())
    print(lead.stage)
    if one_day_ago > lead_date_reg.date() and lead.stage < 1:
        print("Condition 1 occured")
        init_email.send(receiver=lead.email, title="📈 Let's Talk About Your Business Success | Cast Media", content=f"""<!DOCTYPE html><html lang="en"><head></head><body><h1>Hey {lead.name},<h1><p style="font-size:20px;font-weight:300;">I hope you had the chance to dive into our eBook "<b>Mastering Social Media Advertising</b>" and found it insightful.<br> At Cast Media, we're all about helping businesses achieve their set goals.<br><br>We value your time and understand that reading an eBook is just one part of the journey. Now, we'd like to open the door for a conversation. Our mission is to provide tailored solutions that deliver <b>results</b>.<br>(see the attachment below) <br><br>We'd love to hear more about <b>your business</b> and its unique needs. Whether it's about optimizing your online presence, boosting leads, or increasing sales, we're here to assist you.<br><br>Are you available for a brief chat at your convenience? It won't be a sales pitch; instead, think of it as a friendly discussion to explore how we can help you reach new heights.<br><br>Just reply to this email with your preferred time, and we'll make it happen.<br>Thank you for taking your time with us as your partner in success. We look forward to speaking with<br> you.<br><br>Best regards,<br><br>Nichita<br>CEO at Cast Media</p></body></html>""" ,atcmt='insights.xlsx')
        lead.stage = 1
        db.session.commit()
    elif two_days_ago > lead_date_reg.date() and lead.stage < 2:
        print("Condition 2 occured")
        init_email.send(receiver=lead.email, title="🚀 Power Up your Business with a FREE Audit | Cast Media ", content=f"""<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></head><body><h1>Hey there, {lead.name}</h1><br><p>Ready to kick your business into high gear?<br>We pride ourselves on delivering results-driven marketing solutions that don't just boost your online presence but also optimize your processes for maximum efficiency. Our business-centric approach is designed to save you time and resources while driving growth.<br><br>And here's something <b>special for you</b>:<br><b>A FREE audit of your current marketing strategy.</b> This comprehensive audit, <b>valued at $300, is our gift to you.</b> It's an opportunity to uncover areas for improvement and gain a deeper understanding of how we can supercharge your business.<br><br>🔥 Claim Your FREE Audit Now: https://audit.castmedia.md<br><br>This isn't just another sales pitch – it's a chance to unlock the full potential of your business. I'm excited to discuss how we can tailor our expertise to your specific needs during a brief call. Let's create our success story together<br><br>Best Regards,<br>Nichita<br>CEO at Cast Media</p></body></html>""" ,atcmt=None)
        lead.stage = 2
        db.session.commit()

