# Generated by Django 2.1.5 on 2019-02-28 07:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0020_auto_20190228_1552'),
    ]

    operations = [
        migrations.RenameField(
            model_name='humitureinfo',
            old_name='date',
            new_name='date_time',
        ),
    ]