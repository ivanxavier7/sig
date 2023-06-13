# Generated by Django 4.2.1 on 2023-06-13 15:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('listings', '0003_alter_listing_area'),
    ]

    operations = [
        migrations.AlterField(
            model_name='listing',
            name='listing_type',
            field=models.CharField(choices=[('Curricular', 'Curricular'), ('Profissional', 'Profissional'), ('Voluntário', 'Voluntário')], max_length=20),
        ),
    ]
