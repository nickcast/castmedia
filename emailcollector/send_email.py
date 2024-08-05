import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os

class EmailObj():
    def send(self, *, receiver, title, content, atcmt):
        smtp_server = 'castmedia.org'
        smtp_port = 587
        smtp_user = 'solutions@castmedia.org'
        smtp_password = os.getenv("new_code")
        from_addr = 'solutions@castmedia.org'
        to_addr = f'{receiver}'
        subject = title
        body = content

        msg = MIMEMultipart()
        msg['From'] = from_addr
        msg['To'] = to_addr
        msg['Subject'] = subject

        msg.attach(MIMEText(body, 'html'))


        if atcmt:
            filename = atcmt
            BASE_DIR = os.path.dirname(os.path.abspath(__file__))
            filepath = os.path.join(BASE_DIR, 'resources', filename)

            with open(filepath, 'rb') as attachment:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                part.add_header('Content-Disposition', f'attachment; filename= {filename}')
                msg.attach(part)

        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        # print("SMTP User:", smtp_user)
        # print("SMTP Password:", smtp_password)
        server.login(smtp_user, smtp_password)
        server.sendmail(from_addr, to_addr, msg.as_string())
        server.quit()


