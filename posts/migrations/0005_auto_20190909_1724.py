# Generated by Django 2.1.5 on 2019-09-09 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20190909_1716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='p_date',
            field=models.DateTimeField(editable=False, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='u_date',
            field=models.DateTimeField(null=True),
        ),
    ]
