# Generated by Django 2.1.5 on 2019-02-25 02:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0008_auto_20190225_1000'),
    ]

    operations = [
        migrations.AlterField(
            model_name='humitureinfo',
            name='date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]